# 03 — Wiring and power guide

**Only build with USB/regulated low-voltage components.** Have a teacher or adult verify all connections with power disconnected. Check the exact manufacturer's module pinout. Never test with a real flame, smoke, or hot object.

## Safe base circuit (NO pump)
| Uno pin | Device connection | Notes |
|---|---|---|
| 5V | LM35 supply; flame module VCC if rated 5 V | Check sensor module specifications |
| GND | Common signal ground | All logic grounds common |
| D2 | Flame module digital DO | Most low-cost modules: LOW means detection; verify your own |
| A0 | LM35 Vout | LM35 analog sensor output |
| D3 | DEMO button terminal 1 | Other terminal to GND; INPUT_PULLUP |
| D4 | LOW-WATER button terminal 1 | Other terminal to GND; INPUT_PULLUP |
| D5 | Unconnected until optional pump driver is inspected | The code keeps it LOW by default |
| D6 | Passive low-current piezo positive | Other terminal GND |
| D7 | 220-ohm resistor -> red LED anode | LED cathode -> GND |
| D8 | 220-ohm resistor -> green LED anode | LED cathode -> GND |
| D9 | SG90 servo signal wire | Servo POWER from separate 5 V supply |
| D10 | 220-ohm resistor -> blue LED anode | LED cathode -> GND |
| External 5 V | Servo red power lead | Regulated independent supply with adequate current |
| External supply GND | Servo brown/black ground, UNO GND | Common ground, **never** external 5 V to a GPIO |

## LM35 identification
LM35 variants and modules can have different physical layouts. Check the datasheet/product marking: commonly, with the TO-92 flat side facing you and leads downward, the pins from left to right are +Vs / Vout / GND. **Confirm before connecting**: incorrect orientation can harm parts. Raw temperature accuracy depends on Uno's analog reference; calibrate in a comfortable room using a reliable thermometer.

## Circuit overview
```text
                 +-----------------------+
                 |      ARDUINO UNO      |
 Flame DO -------| D2                    |
 DEMO button ----| D3 (button to GND)    |
 LOW WATER ------| D4 (button to GND)    |
 Gate (optional)-| D5                    |
 Piezo buzzer ---| D6                    |
 Red LED --------| D7                    |
 Green LED ------| D8                    |
 SG90 signal ----| D9                    |
 Blue LED -------| D10                   |
 LM35 Vout ------| A0                    |
                 | GND -----------+      |
                 +-----------------|------+
                                   | common signal ground
                           External 5V servo supply
                         +5V -> servo red wire only
                         GND -> servo brown/black
```
Note: all LEDs need individual 220-ohm series resistors. The flame sensor and LM35 need their approved low-voltage supply and shared logic ground.

## Optional pump stage — only after teacher/adult review
- Choose a **5 V DC miniature pump** and a MOSFET rated for fully-on gate drive at Arduino logic voltage and at least the pump's startup current.
- Use a separate adequate **regulated 5 V** pump power supply; do not power the pump from the Arduino board.
- External +5 V -> pump positive.
- Pump negative -> MOSFET drain; MOSFET source -> external supply ground.
- D5 -> 220-ohm resistor -> MOSFET gate; 10-kohm resistor from gate to source/ground.
- Flyback diode across the pump leads: **cathode/striped end to pump +5 V, anode to pump negative/MOSFET drain**.
- Tie external supply GND and Uno GND for the logic reference.
- Place the water bottle/tube/pump assembly on a separate waterproof tray, positioned lower and away from the Uno, USB connection, and all exposed electronics.
- Only after an adult has checked polarity, insulation, driver suitability, leak protection, and a non-water dry-run should `ENABLE_PUMP_OUTPUT` be changed from `false` to `true` in `include/config.h`.
- Never run an unapproved motor, pump, relay, or mains-powered device from a microcontroller pin.

## General checks
1. USB unplugged; compare EVERY wire against the pin map.
2. Confirm all grounds are correct and no short is possible.
3. Test individual LEDs and buttons in software.
4. Start with the pump disconnected and output disabled.
5. Verify servo supply stability with a teacher; an unstable supply can repeatedly reset Uno.
6. Keep all liquids out of the electronics zone.

## Firmware signals and timing
See docs/04_FIRMWARE_AND_STATES.md. Servo uses Timer1 on a classic Uno; do not add PWM output on pins 9/10 without checking Servo library interactions.
