# Codex instructions — VANARAKSHAK

You are working in an existing GitHub repository containing an Arduino Uno educational forest-firefighter project.

## Priority
1. **Safety**: classroom demonstration only; no open flame, smoke, heaters, mains electricity, or dangerous fire testing. Pump output must remain disabled by default. The no-pump blue-LED demonstration is always supported.
2. **Compatibility**: Arduino Uno R3 ATmega328P, PlatformIO `env:uno`, Servo library. Avoid ESP8266 dependencies unless asked.
3. **Preserve**: never delete unrelated existing files, history, LICENSE, or other projects. Keep changes in a feature branch and open a PR.
4. **Docs**: `include/config.h` is the authoritative pin map; synchronize `docs/03_WIRING_AND_POWER.md` and `docs/12_PIN_MAP.md` with wiring or code changes.
5. **Test**: run native g++ logic tests and `pio run -e uno`; if unavailable, explain rather than claiming success. Add tests for changes to state logic.
6. **Truth**: distinguish simulator output from measurements. Do not claim hardware tests or sensor accuracy without actual evidence.

## Current tree
- `README.md`: overview and links
- `platformio.ini`: build target
- `src/main.cpp`: firmware, event loop
- `src/fire_logic.h`: pure logic, native-testable
- `include/config.h`: pin allocation and configurable timing
- `test/fire_logic_test.cpp`: portable smoke tests
- `docs/01..12`: specifications, parts, wiring, logic, crafts, safety, demo, roadmap and checking
- `.github/workflows/firmware.yml`: native tests + firmware compile
- `CODEX_STARTER_PROMPT.md`: detailed next-agent work order

## Quality constraints
- Keep nonblocking `millis()` state machines, basic debounce and explicit pin types.
- Avoid `delay()` in loop and dynamic heap allocation where possible.
- Preserve default digital pump gate LOW unless a real circuit is independently approved by a teacher/adult.
- Use **fake/simulated** alarms for demo, not actual fire/heat exposure.
- Prefer readable beginner code with explanatory comments.
- Keep additions practical for low-cost recycled-material science-fair displays.
- Do not add unnecessary cloud accounts, Wi-Fi, internet uploads, third-party paid APIs or credentials.

## Finish
Provide a PR summary with changed files, actual test outcomes, hardware follow-up tasks, safety notes, and limitations. Never self-merge without being asked.
