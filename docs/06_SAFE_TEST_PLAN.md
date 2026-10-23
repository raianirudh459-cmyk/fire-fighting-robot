# 06 — Safe test plan and acceptance sheet

Test the **no-pump, no-water, no-flame** version first. Never use a real flame, hot object, smoke source, or uncontrolled heat as a demonstration. These steps use buttons and static code checks.

## Checklist before power
- [ ] Teacher/adult checked LM35 and flame module labels and voltage ratings.
- [ ] USB disconnected during wiring changes.
- [ ] Servo uses suitable regulated power; grounds shared.
- [ ] No shorts, bare stray wire, or LED connected without resistor.
- [ ] Optional pump DISCONNECTED; `ENABLE_PUMP_OUTPUT = false`.
- [ ] Water tank prop sealed and away from electronics.

## Scripted dry-run tests
| ID | Setup and action | Expected output |
|---|---|---|
| T01 | Turn on, don't press buttons | Green LED solid; pump pin LOW; blue off |
| T02 | Read Serial Monitor | 115200 baud; plausible room temperature after calibration |
| T03 | Tap DEMO once | Red blinks + piezo; blue on 3 s / off 7 s; servo pans during blue |
| T04 | Tap DEMO a second time | Green solid; red and blue off; servo centers |
| T05 | While demo is active, hold LOW WATER | Blue off and optional pump gate LOW, alert continues |
| T06 | Release LOW WATER while demo active | Blue resumes cycling, returning to SPRAY phase |
| T07 | Restart Uno with both buttons unpressed | Demo resets OFF; pump gate remains LOW |
| T08 | Press/release DEMO repeatedly and slowly | Each separate press toggles only once |
| T09 | Cover/uncover sensor under ordinary indoor conditions (no heat/flame) | Serial flame value may change; do NOT infer fire detection quality |
| T10 | Disconnect pump permanently for event use | Complete demonstration works with LED + servo alone |

## Software test commands
```bash
g++ -std=c++11 -Wall -Wextra -Werror test/fire_logic_test.cpp -o /tmp/forest-logic-test
/tmp/forest-logic-test
pio run -e uno
```

## What to record
Date, operator, board model, software version/commit, test ID, pass/fail, serial excerpt (no private data), corrective action, adult-check signature for any optional wet stage. Never describe a test as passed if you did not run it.

## Optional pump acceptance — adult only
Power must be separate, motor driver suitable, flyback diode fitted, leaks excluded, cable insulation secured, water away from electronics, and emergency power-disconnect accessible. Firmware default remains pump-disabled until check is completed.

## Exiting a failure
Unplug the USB/power source before moving wiring. Record which test failed. Repeat dry testing before any pump stage.
