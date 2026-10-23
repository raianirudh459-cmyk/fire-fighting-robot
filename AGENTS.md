# VANARAKSHAK agent and contributor instructions

## Frontend stack is fixed
Use only **HTML, CSS, and vanilla browser JavaScript** for the web dashboard. No React, TypeScript, Vite, Node.js, npm, CDNs or package manager/build system unless the user later explicitly changes this decision. Run `web/index.html` and `web/tests.html` directly in a browser. The tool-free design should be documented in `web/README.md`.

## Ownership and scope
**User:** UI, mobile UX, sensor dashboard, state, transport integration and frontend verification.
**Saksham:** rover firmware and onboard control, motor drivers, environmental sensors, autonomy, on-device watchdog, network endpoint, actual camera board identification and power/electrical design.
Preserve all other people's code; do not silently alter hardware firmware or earlier Arduino Uno legacy prototype. The old `src/`, `include/`, `platformio.ini`, and `test/fire_logic_test.cpp` are **not 4WD firmware**.

## Frontend structure
- `web/index.html`: markup
- `web/styles.css`: responsive styling
- `web/state.js`: pure state and fixtures; keep easy to test
- `web/app.js`: DOM and event handling
- `web/tests.html`, `web/tests.js`: no-dependency browser logic tests
- `web/README.md`: setup and capabilities
- `docs/13_WEB_DASHBOARD.md` and `docs/14_API_CONTRACT.md`: UI/API agreements

## Safety and truthfulness
- Simulator is explicitly labeled. Do not present fake telemetry as real.
- MQ135 is not a precise smoke-ppm or standard AQI reading without proper calibration.
- Actual camera board ("ESP8266 Cam") remains unconfirmed.
- No open flame, smoke, heaters or real fire tests.
- No public internet motor-control interface or hardcoded secrets.
- Web STOP and direction-release are supplementary; the physical robot firmware must stop its motors autonomously on stale commands/fault and support physical switch OFF.
- Pump disabled until teacher/adult reviews the wet setup.
- No DIY lithium-ion batteries, pack construction or charging instructions.
- No unattended/outdoor autonomous testing; controlled indoor demo only.
- Missing sensor data must be represented as unavailable and state handling cannot restart motion after reconnection.

## Git workflow and verification
Commit only relevant frontend/docs changes on an isolated feature branch. Maintain a reviewable PR. Run real tests and describe actual results, never claim unrun hardware or browser tests. Ensure modified JS remains valid classic browser JavaScript (no imports/modules required). Do not self-merge without approval.
