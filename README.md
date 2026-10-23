# VANARAKSHAK — The Forest Fire Fighter

**Competition topic:** The Forest Fire Fighter  
**Slogan:** **Detect Early. Spray Smart. Save Forests.**

VANARAKSHAK is a school science-fair **miniature demonstration model**: an Arduino Uno monitors a flame-sensor module and an LM35 temperature sensor, warns about possible fire, and demonstrates a rotating, water-saving sprinkler. A dedicated demo button makes a complete presentation possible **without flame, heat, smoke, or risky testing**.

> **Important:** This is an educational prototype, NOT a certified wildfire detection system, firefighting machine, autonomous emergency responder, or life-safety device.

## Competition rubric: what the project demonstrates

| Requirement | Our implementation |
| --- | --- |
| Eco-friendly 3D model | Reused cardboard forest base, paper trees, reclaimed bottle water tank |
| Detect forest fire | Flame module + LM35 temperature (educational dual-input confirmation) |
| Innovative feature | A **3-second spray / 7-second pause** water-saving response cycle |
| Protect wildlife | Mark a wildlife refuge zone and explain why early warning matters |
| Name and slogan | VANARAKSHAK — Detect Early. Spray Smart. Save Forests. |
| 5-minute presentation | Rehearsable script and safe demo in docs/07_PRESENTATION_SCRIPT.md |

## How the demo works

1. On power-up, the green READY LED lights up.
2. If just one real sensor indicates a problem, the red WARNING LED flashes and a buzzer sounds.
3. If the flame sensor is active and measured temperature is at least 42 °C for 2 seconds, the model enters confirmed-response mode.
4. Press the **DEMO** button to toggle the same response safely, without a real flame.
5. The blue SPRAY LED and a moving SG90 nozzle demonstrate water delivery: **3 seconds active, then 7 seconds resting**.
6. Hold the **LOW-WATER** button to simulate an empty tank: spraying is inhibited and a warning continues.
7. Press DEMO again to reset.

**PUMP OUTPUT IS DISABLED BY DEFAULT.** A 5 V miniature pump and driver are optional and require an adult to inspect the independent pump power circuit and waterproofing first. Do not connect a pump directly to any Arduino pin or power it from the Uno's 5 V pin.

## Documentation

- [01 — Project brief](docs/01_PROJECT_BRIEF.md)
- [02 — Parts and reusable materials](docs/02_PARTS_AND_MATERIALS.md)
- [03 — Wiring and power](docs/03_WIRING_AND_POWER.md)
- [04 — Firmware design](docs/04_FIRMWARE_AND_STATES.md)
- [05 — Construction plan](docs/05_3D_BUILD_PLAN.md)
- [06 — Testing and acceptance](docs/06_SAFE_TEST_PLAN.md)
- [07 — Five-minute presentation](docs/07_PRESENTATION_SCRIPT.md)
- [08 — Safety, ethics and limitations](docs/08_SAFETY_AND_LIMITATIONS.md)
- [09 — Development roadmap](docs/09_ROADMAP.md)
- [10 — Judging checklist](docs/10_JUDGING_CHECKLIST.md)
- [11 — Troubleshooting](docs/11_TROUBLESHOOTING.md)
- [12 — Pin map](docs/12_PIN_MAP.md)
- [Codex starter prompt](CODEX_STARTER_PROMPT.md)
- [Codex contributor instructions](AGENTS.md)

## Software setup

Designed for **Arduino Uno R3 (ATmega328P)**. Install [PlatformIO](https://platformio.org/) in VS Code and open the repository folder, or use the Arduino IDE with Servo installed.

```bash
pio run -e uno
pio run -e uno -t upload
pio device monitor -b 115200
```

For quick host-side logic checks: `g++ -std=c++11 -Wall -Wextra -Werror test/fire_logic_test.cpp -o /tmp/vanarakshak-test && /tmp/vanarakshak-test`

Firmware files are `src/main.cpp`, `src/fire_logic.h`, and `include/config.h`. For the Arduino IDE, open a new sketch and copy these files into a compatible sketch layout, or use PlatformIO directly.

## Status

- [x] Project specification, pin map, build plan, and demonstration script
- [x] Initial firmware and native logic tests
- [ ] Actual Arduino Uno hardware compilation, upload, and sensor calibration
- [ ] Physical cardboard model and water-proofing inspection
- [ ] Optional pump integration after adult review
- [ ] Full five-minute physical rehearsal

This branch intentionally leaves pre-existing ESP8266 material untouched. A future Wi-Fi upgrade is optional; the initial design needs **only Arduino Uno**.
