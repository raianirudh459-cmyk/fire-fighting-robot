# 12 — Provisional electrical interface inventory (NO definitive pin assignment)

**STOP: Do not reuse the Arduino Uno 1.0 table for the new 4WD rover.** The existing `include/config.h` pins describe an obsolete stationary project and are NOT an approved wiring diagram for this vehicle.

## Required final hardware mapping by Saksham
| Subsystem | Confirm actual module and quantity | GPIO/voltage assignment status |
|---|---|---|
| Four DC motors | Motor model, running/stall current, gearbox | Unassigned |
| Two L298N drivers | Driver ratings and motor-channel allocation | Unassigned |
| ESP8266 Wi-Fi board | Exact dev board and logic levels | Unassigned |
| Main rover controller | Uno? another board? confirm | Not confirmed |
| Flame sensor(s) | Module DO/AO, voltage, detection polarity | Unassigned |
| IR obstacle sensor(s) | Module logic polarity and location | Unassigned |
| Ultrasonic sensor(s) | Trigger/echo voltage/interface | Unassigned |
| DHT11 | Temperature and humidity digital line | Unassigned |
| MQ135 | Module voltage, heater consumption, analog interface | Unassigned |
| Relay and 5 V pump | Adult-reviewed switching and independent power | DISABLED; unassigned |
| Camera | Exact module/chip and verified local stream | Not confirmed |
| Protected battery supply | Rated preassembled solution and switch | Adult sign-off pending |

## Why this matters
- ESP8266 GPIO pins are limited; many of the proposed modules compete for them.
- ESP8266 uses 3.3 V logic; 5 V sensor outputs may require suitable level conversion.
- MQ135 can require more electrical power for its heater than tiny logic pins can provide.
- L298N motor-drive suitability depends on the motor current and power dissipation, not simply the number of DC motors.
- A board described as "ESP8266 Cam" might not use an ESP8266; camera support and interface are conditional.

## Deliverable required for physical assembly
Saksham should commit `firmware/docs/HARDWARE_PINMAP.md` **only after exact component identification**, adult inspection and a matching tested schematic. It should state each pin, logic voltage, confirmed supply rating, connected device, and testing outcome. The web developer need only know the JSON API in docs/14.
