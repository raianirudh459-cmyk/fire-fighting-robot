# 02 — Parts and reusable materials

Quantities are for one tabletop working demonstration. Buy or borrow only what you need; inspect exact part pinouts before wiring.

| Quantity | Part | Purpose | Essential? |
|---:|---|---|---|
| 1 | Arduino Uno R3 compatible board and USB cable | Controller and programming | Yes |
| 1 | 3-pin or 4-pin IR flame sensor module with digital DO | Input demonstration | Yes |
| 1 | LM35 temperature sensor | Analog temperature input | Yes |
| 1 | SG90 5 V microservo and light plastic/paper nozzle | Turn a model sprinkler arm | Yes |
| 1 | Low-current passive piezo buzzer | Beep alert | Yes |
| 1 each | Green, red, and blue LEDs | Ready, alert, simulated spray | Yes |
| 3 | 220-ohm LED resistors | LED current limiting | Yes |
| 2 | Momentary push buttons | Safe fire demo, low-water simulation | Yes |
| 1 | Breadboard or supervised solderless connection board | Safe rearrangeable circuit | Yes |
| 1 set | Jumper wires, labels, tape | Connections and presentation | Yes |
| 1 | USB power bank or USB port suitable for Uno | Main regulated 5 V | Yes |
| 1 | Separate **regulated** 5 V servo supply, sufficient current | Keep servo currents off Uno regulator | Recommended |
| 1 | Small 5 V DC pump and flexible tubing | Optional water-moving display | **Optional, adult supervised** |
| 1 | Logic-level N-channel MOSFET rated for the pump current | Switch the optional pump | Optional |
| 1 | Flyback diode suited to pump | Protect against motor switching spikes | Optional |
| 1 | 10-kilohm resistor + 220-ohm gate resistor | Hold MOSFET off and protect gate drive | Optional |
| 1 | Separate regulated 5 V pump supply | Avoid drawing pump current from Arduino | Optional |

## Reused model materials
- Flat, rigid discarded carton, around 50 × 35 cm, for a base.
- Waste cardboard rolls or rolled scrap paper for tree trunks.
- Used green packaging/paper for leaves, layered canopy, and shrubs.
- A clean reclaimed bottle to depict a water tank, kept away from electronics.
- Waste paper for animal silhouettes, evacuation arrows, and signs.
- Old packaging foam or folded cardboard as mounts; use nonconductive fixings.
- Paper flags: FIRE ALERT, WATER SAVER, WILDLIFE SAFE ZONE.

## Substitutions
- If a sensor is unavailable, use the safe demo button to finish testing, but do not claim live detection is implemented until the sensor is actually fitted and verified.
- If no separate servo power supply is available, ask a teacher to review current requirements; do not draw high servo/pump currents from the Uno.
- If a 5 V pump is too difficult or messy, **the blue LED + moving nozzle is a complete, safer demonstration.**

## Purchasing caution
No price is guaranteed. Record actual local costs and classify reused components as reused, borrowed components as borrowed. Do not copy online prices without dates.
