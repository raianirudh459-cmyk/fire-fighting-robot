# Codex starter prompt — VANARAKSHAK

You are a senior embedded-systems engineer, Arduino educator, and school STEM exhibition mentor. Work in the connected GitHub repo **raianirudh459-cmyk/fire-fighting-robot**, starting from the **feature/vanarakshak-uno-foundation** branch, which already contains starter source, 12 project documents, and CI. Do NOT recreate or replace the repo. Create your own new working branch from the current feature branch (for example `codex/vanarakshak-verification`), and ultimately open a PR toward `feature/vanarakshak-uno-foundation`. Do not touch `main` or remove the unrelated existing ESP8266 file. Read `AGENTS.md` first, then `README.md`, then every file in `docs/`, `include/`, `src/`, `test/`, `platformio.ini`, and GitHub Actions.

## Project objective
Prepare an age-appropriate, reusable-material **3D Forest Fire Fighter educational model** called **VANARAKSHAK**, slogan **Detect Early. Spray Smart. Save Forests.** The competition rules are: (1) eco-friendly/reusable 3D model; (2) demonstrate identifying forest-fire signs or protecting animals; (3) at least one innovative feature, such as a sensor or sprinkler; (4) clearly explain forest/wildlife/biodiversity problem and how the model addresses it; (5) model name and slogan; (6) completed model; (7) a five-minute jury presentation.

### Non-negotiable interpretation
This is a **static tabletop Arduino Uno demonstration**, not a real-world firefighting appliance. Real fire, smoke, heating tools, outdoor trials, and life-safety claims are prohibited. The default working mode uses a button to simulate fire, an SG90 servo to sweep a lightweight paper nozzle, and a BLUE LED to represent intermittent water delivery. Real pump activation must stay disabled (`ENABLE_PUMP_OUTPUT = false`) unless the human user explicitly requests optional work *after* teacher/adult electrical and waterproofing inspection. The output must never tell a student to test using fire. Do not claim that a low-water *button* is a physical water-level sensor.

## Existing planned wiring — don't change without updating every document
Uno:
- D2: digital output DO from a checked 5 V-compatible flame module (commonly LOW = detected)
- A0: LM35 analog Vout, with verified exact LM35 part pinout
- D3: safe-demo momentary button -> ground, `INPUT_PULLUP`
- D4: simulated-low-water momentary button -> ground, `INPUT_PULLUP`
- D5: reserved optional logic-level MOSFET pump gate (LOW by default; disconnected for the classroom)
- D6: small passive piezo buzzer
- D7: red alert LED via 220-ohm resistor
- D8: green ready LED via 220-ohm resistor
- D9: SG90 servo signal; servo powered by separately regulated suitable 5 V source, common ground
- D10: blue simulated-spray LED via 220-ohm resistor.
Keep all wet items and tanks physically separated from the electronics.

## Expected firmware behavior
- Ready: green LED ON, red and blue OFF.
- Caution: if only one sensor warns, red flash + beep, no spray request.
- Confirmed real-sensor logic: only if flame digital DO indicates detection **and** LM35 temperature is at/above a configurable threshold for at least 2 continuous seconds. This is merely a learning example, not reliable wildfire recognition.
- Demo: pressing D3 enters response mode regardless of real sensors. Pressing D3 again returns to normal sensing.
- Response: servo sweeps around 60–120 degrees during the **3 seconds ON / 7 seconds OFF** LED cycle; optional pump output stays forcibly off in default firmware.
- Low-water simulated hold: D4 forces spray LED OFF (and optional gate LOW) but warning remains active.
- Code should stay nonblocking, avoid memory-heavy types on Uno, provide readable 115200 baud diagnostics.
- Check for overflow-safe `millis()` comparisons and for ADC and input polarity assumptions.
- Do not make unsafe promises that firmware alone makes a pump circuit fail-safe.

## Your mission (execute, don't just plan)
1. Inspect repository and current branch. Keep the present docs/content as the baseline; preserve history.
2. Run the native logic test command:
   `g++ -std=c++11 -Wall -Wextra -Werror test/fire_logic_test.cpp -o /tmp/forest-logic-test && /tmp/forest-logic-test`
3. Run a clean PlatformIO build: `pio run -e uno`. If tools aren't installed, install normally if permitted, otherwise document limitation truthfully. Do not fabricate passing results.
4. Thoroughly review `src/main.cpp` and `src/fire_logic.h`; fix actual compile/logic mistakes, including edge cases around `millis()`, button debouncing, a persistent dual-sensor confirmation window, servo travel bounds, pump-disabled guarantee, and re-entering ready.
5. Improve testability by extracting pure C++ decision logic (where feasible) and writing meaningful host tests: READY, CAUTION, confirmed real-sensor fire, simulated DEMO, low-water inhibit, reactivation after low-water release, spray ON/OFF timings, servo sweep bounds, boot pump OFF, and demo reset. If hardware-only tests cannot execute on host, document them as manual checks rather than claiming them automated.
6. Where worthwhile, refactor to a clean modules structure, retaining Arduino Uno RAM and flash limits and beginner readability. Prefer the current small, readable design over over-engineered frameworks.
7. If needed, add a **print-friendly** labeled pin diagram, wiring table, black-and-white block diagram, and storyboard as text or SVG, with no unverifiable circuit promises. Every wiring reference MUST match `include/config.h`. Optional assets in `assets/`; don't depend on unavailable image generation tools.
8. Improve existing docs for a novice student: parts and cost worksheet with prices left blank until verified; eco-friendly cardboard craft instructions; precise output demonstration; 5-minute presentation script; rubric coverage, limitations, troubleshooting.
9. Include safe stage-by-stage assembly steps: start with dry electronics, then mount the lightweight nozzle, then add decorative reused forest pieces. Keep the classroom demo pump-free.
10. Audit GitHub Actions for the correct PlatformIO build; if needed, pin dependency versions reasonably, and ensure the test job fails on real errors.
11. Update `docs/09_ROADMAP.md`, adding only tasks actually completed. Mark actual hardware upload, live servo movement, and real sensor calibration as unverified unless evidence exists.
12. Commit logically, push to your working branch, and create a pull request back into `feature/vanarakshak-uno-foundation`. Include PR description: features, before/after, testing commands and exact actual outcomes, parts still to acquire, no-fire safety disclaimer, and checklist. Do not self-merge unless asked.

## Definition of done
- The Arduino Uno sketch compiles for the Uno target in PlatformIO, or a real blocker is clearly documented.
- Native test suite passes and meaningful edge cases are covered.
- Clear, internally consistent source, docs, diagrams and pin assignments.
- No fake hardware test claims; no real-fire test instructions.
- Demo mode works in design with a single button, blinking LEDs, buzzer, sweeping servo, simulated water-saving, and low-water stop.
- Source committed and pushed; PR created when GitHub permissions allow.
- Provide final concise summary, commit/PR link, test evidence, and next physical-build steps.

## Working style
Act autonomously within this scope. Don't ask basic questions the repository already answers. Favor safe reasonable defaults, run validations, update documentation, and only stop for a genuine blocker or decision requiring physical hardware. Avoid paid external services and credentials. Do not create any Codex recurring/background task.

## Important distinction
This instruction is intended **to be pasted into Codex** and will consume whatever Codex usage the user's account ordinarily uses. The repository foundation itself has already been committed via the connected GitHub app, independently of Codex.
