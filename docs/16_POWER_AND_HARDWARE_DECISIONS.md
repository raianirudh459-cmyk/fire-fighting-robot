# 16 — Unresolved hardware decisions and power-safety ownership

**This file intentionally does not give instructions for assembling or charging lithium-ion packs.** A suitably rated, commercially assembled and protected battery supply plus an adult/teacher review are prerequisites before any mobile robot is energized.

## Electrical ownership
Saksham + responsible adult must select and verify:
- Exact motor controller main board (is the original Arduino Uno retained?).
- ESP8266 model and appropriate 3.3 V logic interfaces.
- Camera board exact marking and its requirements; camera-oriented code commonly targets ESP32 families, not generic ESP8266.
- Each DC motor's rated/stall current and L298N's thermal/current capability; two boards alone do not guarantee compatibility.
- Motor power, logic power, pump power, appropriately rated switching/protection and accessible master OFF switch.
- Sensor operating voltages and appropriate signal conditioning; never connect an unreviewed 5 V analog output directly to 3.3 V-only ADC.
- MQ135 heater requirement/warm-up and suitable sensor calibration.
- DHT11 sampling limitations.
- Physical relay/pump wet-stage isolation and leakage protections.

## Proposed conceptual architecture
- Browser only communicates with a validated local network endpoint.
- ESP8266 can act as Wi-Fi gateway while a separate controller handles real-time motors and sensor GPIO **if** Saksham confirms need and availability.
- Optional camera module is independent unless exact hardware allows otherwise.
- Pump relay remains inactive on boot. No web action can bypass physical/firmware safeguards.
- Every planned function must remain disabled if the physical module is not ready.

## Decision log template
| Decision | Actual board/model or conclusion | Evidence | Owner | Date |
|---|---|---|---|---|
| Main MCU | **Unconfirmed** |  | Saksham |  |
| Camera chipset | **Unconfirmed** | Label/photo needed | Saksham |  |
| Motors/L298N match | **Unconfirmed** | Datasheet/current test | Saksham + adult |  |
| Protected commercial power | **Unconfirmed** | Rating and adult approval | Adult |  |
| Communication API | **Proposed in docs/14** | Firmware example pending | Both |  |
| Pump/relay safe wet setup | **Not approved** | Adult inspection pending | Saksham + adult |  |

## Safe software-only path
You can complete nearly the entire web dashboard using simulated telemetry and mock drive events without physically energizing motors, battery or pump. The demo UI must say SIMULATED until real firmware confirms data.
