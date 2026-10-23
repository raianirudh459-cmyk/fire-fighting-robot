#include <Arduino.h>
#include <Servo.h>
#include "config.h"
#include "fire_logic.h"

using namespace config;
static Servo nozzle;

enum class SprayPhase : uint8_t { IDLE, SPRAYING, RESTING };
static SprayPhase sprayPhase = SprayPhase::IDLE;
static uint32_t phaseStartedAt = 0;
static uint32_t confirmationStartedAt = 0;
static uint32_t lastServoStepAt = 0;
static uint32_t lastTelemetryAt = 0;
static uint32_t buttonChangedAt = 0;
static bool demoLatched = false;
static bool buttonRawLast = false;
static bool buttonStable = false;
static bool nozzleForward = true;
static uint8_t nozzleDegrees = 60;

static const char* alertName(forest::AlertLevel a) {
  switch (a) {
    case forest::AlertLevel::READY: return "READY";
    case forest::AlertLevel::CAUTION: return "CAUTION";
    case forest::AlertLevel::CONFIRMED: return "CONFIRMED";
  }
  return "UNKNOWN";
}

static float readLm35Celsius() {
  // LM35: 10 millivolts per Celsius degree; 10-bit ADC.
  const int raw = analogRead(LM35_PIN);
  return (static_cast<float>(raw) * ADC_REFERENCE_VOLTS / 1023.0f) * 100.0f;
}

static void updateDemoButton(uint32_t now) {
  const bool rawPressed = digitalRead(DEMO_BUTTON_PIN) == LOW;
  if (rawPressed != buttonRawLast) {
    buttonRawLast = rawPressed;
    buttonChangedAt = now;
  }
  if (rawPressed != buttonStable && now - buttonChangedAt >= DEBOUNCE_MS) {
    buttonStable = rawPressed;
    if (buttonStable) {
      demoLatched = !demoLatched; // single press to start, another to reset
      Serial.print(F("DEMO toggled: "));
      Serial.println(demoLatched ? F("ON") : F("OFF"));
    }
  }
}

static bool updateConfirmation(bool flameDetected, float tempC, uint32_t now) {
  const bool bothSensors = flameDetected && tempC >= CONFIRM_TEMP_C;
  if (!bothSensors) {
    confirmationStartedAt = 0;
    return false;
  }
  if (confirmationStartedAt == 0) confirmationStartedAt = now;
  return now - confirmationStartedAt >= REAL_FIRE_CONFIRM_MS;
}

static void updateSpray(bool requested, uint32_t now) {
  if (!requested) {
    sprayPhase = SprayPhase::IDLE;
  } else if (sprayPhase == SprayPhase::IDLE) {
    sprayPhase = SprayPhase::SPRAYING;
    phaseStartedAt = now;
  } else if (sprayPhase == SprayPhase::SPRAYING &&
             now - phaseStartedAt >= SPRAY_ON_MS) {
    sprayPhase = SprayPhase::RESTING;
    phaseStartedAt = now;
  } else if (sprayPhase == SprayPhase::RESTING &&
             now - phaseStartedAt >= SPRAY_OFF_MS) {
    sprayPhase = SprayPhase::SPRAYING;
    phaseStartedAt = now;
  }

  const bool spraying = sprayPhase == SprayPhase::SPRAYING;
  digitalWrite(SPRAY_LED_PIN, spraying ? HIGH : LOW);
  digitalWrite(PUMP_GATE_PIN, (ENABLE_PUMP_OUTPUT && spraying) ? HIGH : LOW);
}

static void updateNozzle(uint32_t now) {
  if (sprayPhase != SprayPhase::SPRAYING) {
    nozzleDegrees = 90;
    nozzle.write(nozzleDegrees);
    return;
  }
  if (now - lastServoStepAt < SERVO_STEP_MS) return;
  lastServoStepAt = now;
  if (nozzleForward) {
    nozzleDegrees = static_cast<uint8_t>(nozzleDegrees + 5);
    if (nozzleDegrees >= 120) nozzleForward = false;
  } else {
    nozzleDegrees = static_cast<uint8_t>(nozzleDegrees - 5);
    if (nozzleDegrees <= 60) nozzleForward = true;
  }
  nozzle.write(nozzleDegrees);
}

static void updateIndicators(forest::AlertLevel alert, bool lowWater, uint32_t now) {
  const bool isReady = alert == forest::AlertLevel::READY && !lowWater;
  const bool flash = (now / 350UL) % 2UL == 0;
  digitalWrite(READY_LED_PIN, isReady ? HIGH : LOW);
  digitalWrite(WARNING_LED_PIN, isReady ? LOW : (flash ? HIGH : LOW));
  if (!isReady && flash) {
    tone(BUZZER_PIN, lowWater ? 850 : 1400);
  } else {
    noTone(BUZZER_PIN);
  }
}

void setup() {
  Serial.begin(115200);
  pinMode(FLAME_DIGITAL_PIN, INPUT);
  pinMode(DEMO_BUTTON_PIN, INPUT_PULLUP);
  pinMode(LOW_WATER_PIN, INPUT_PULLUP);
  pinMode(PUMP_GATE_PIN, OUTPUT);
  pinMode(WARNING_LED_PIN, OUTPUT);
  pinMode(READY_LED_PIN, OUTPUT);
  pinMode(SPRAY_LED_PIN, OUTPUT);
  pinMode(BUZZER_PIN, OUTPUT);
  digitalWrite(PUMP_GATE_PIN, LOW); // fail-safe output on boot
  nozzle.attach(SERVO_PIN);
  nozzle.write(90);
  Serial.println(F("VANARAKSHAK: educational demo, not a real safety system"));
  Serial.println(F("Press DEMO to simulate fire; LOW WATER inhibits spray."));
  Serial.print(F("Real pump output: "));
  Serial.println(ENABLE_PUMP_OUTPUT ? F("ENABLED") : F("DISABLED"));
}

void loop() {
  const uint32_t now = millis();
  updateDemoButton(now);

  const bool flame = digitalRead(FLAME_DIGITAL_PIN) == LOW;
  const float tempC = readLm35Celsius();
  const bool lowWater = digitalRead(LOW_WATER_PIN) == LOW;
  const bool confirmedReal = updateConfirmation(flame, tempC, now);
  const forest::AlertLevel alert = forest::evaluate(
      flame, tempC, CONFIRM_TEMP_C, confirmedReal, demoLatched);

  updateSpray(forest::maySpray(alert, lowWater), now);
  updateNozzle(now);
  updateIndicators(alert, lowWater, now);

  if (now - lastTelemetryAt >= TELEMETRY_MS) {
    lastTelemetryAt = now;
    Serial.print(F("temperature_C="));
    Serial.print(tempC, 1);
    Serial.print(F(" flame="));
    Serial.print(flame ? 1 : 0);
    Serial.print(F(" demo="));
    Serial.print(demoLatched ? 1 : 0);
    Serial.print(F(" low_water="));
    Serial.print(lowWater ? 1 : 0);
    Serial.print(F(" alert="));
    Serial.print(alertName(alert));
    Serial.print(F(" spray_led="));
    Serial.println(sprayPhase == SprayPhase::SPRAYING ? 1 : 0);
  }
}
