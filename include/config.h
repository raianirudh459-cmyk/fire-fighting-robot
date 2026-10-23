#pragma once
#include <Arduino.h>

// Arduino Uno R3 (ATmega328P). Keep docs/12_PIN_MAP.md synchronized.
namespace config {
constexpr uint8_t FLAME_DIGITAL_PIN = 2; // typical flame module DO: LOW means detected
constexpr uint8_t DEMO_BUTTON_PIN = 3;   // push button -> GND (INPUT_PULLUP)
constexpr uint8_t LOW_WATER_PIN = 4;     // demo push button -> GND (INPUT_PULLUP)
constexpr uint8_t PUMP_GATE_PIN = 5;     // MOSFET gate through 220-ohm resistor
constexpr uint8_t BUZZER_PIN = 6;        // small passive piezo buzzer, not a large alarm
constexpr uint8_t WARNING_LED_PIN = 7;  // via 220-ohm resistor
constexpr uint8_t READY_LED_PIN = 8;    // via 220-ohm resistor
constexpr uint8_t SERVO_PIN = 9;        // SG90 signal (external regulated 5 V for power)
constexpr uint8_t SPRAY_LED_PIN = 10;   // via 220-ohm resistor
constexpr uint8_t LM35_PIN = A0;        // LM35 analog output

// Safe by default: blue LED simulates spraying; no electrical pump activation.
constexpr bool ENABLE_PUMP_OUTPUT = false;
// LM35 outputs ~10 mV/deg C. Calibrate board's ADC supply reference in hardware.
constexpr float ADC_REFERENCE_VOLTS = 5.0f;
constexpr float CONFIRM_TEMP_C = 42.0f;
constexpr uint32_t REAL_FIRE_CONFIRM_MS = 2000UL;
constexpr uint32_t SPRAY_ON_MS = 3000UL;
constexpr uint32_t SPRAY_OFF_MS = 7000UL;
constexpr uint32_t DEBOUNCE_MS = 40UL;
constexpr uint32_t SERVO_STEP_MS = 180UL;
constexpr uint32_t TELEMETRY_MS = 1000UL;
} // namespace config
