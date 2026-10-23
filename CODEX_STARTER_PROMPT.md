# CODEX STARTER PROMPT — VANARAKSHAK 2.0 RESPONSIVE WEB CONTROL

**Copy this whole prompt into Codex if you choose to use Codex.** Files and this prompt are already maintained directly in GitHub without spending Codex allowance. Actual Codex execution will use the allowance applicable to your account.

## Mission / product
Act as a senior frontend engineer, real-time IoT dashboard architect, accessibility expert, and collaborative GitHub maintainer. Develop a **mobile-first web dashboard** for VANARAKSHAK 2.0: a school science-fair 4-wheel forest-firefighter demonstration rover.

Your primary stakeholder and frontend owner is the user. **Saksham** is responsible for robotics firmware, sensor wiring, driving logic, autonomous navigation, and local Wi-Fi API implementation. You must not take over, rewrite or overwrite Saksham's firmware. Agree on a typed, versioned API contract and build the frontend with simulated telemetry first.

**GitHub repo:** `raianirudh459-cmyk/fire-fighting-robot`
**Baseline branch:** `feature/vanarakshak-uno-foundation` (now includes VANARAKSHAK 2.0 roadmap)
**Your working branch:** create `codex/web-dashboard-v2` (or unique equivalent) from latest baseline, push, and open a PR into the baseline. Do not merge to main.

Project name: **VANARAKSHAK 2.0 — Forest Fire Fighter Rover**
Slogan: **Detect Early. Respond Smart. Protect Forests.**

## Read first
Read `AGENTS.md`, `README.md`, `docs/01_PROJECT_BRIEF.md`, `docs/13_WEB_DASHBOARD.md`, `docs/14_API_CONTRACT.md`, `docs/15_TEAM_WORKFLOW.md`, `docs/16_POWER_AND_HARDWARE_DECISIONS.md`, `docs/17_WEB_TEST_PLAN.md` and the starter `web/` files. Read other docs for context. Identify that `src/main.cpp`, `include/config.h` and `platformio.ini` are **old Arduino Uno stationary model firmware** and NOT confirmed code for this mobile robot. Preserve those files.

## Hardware context (do not infer pin map)
- Four DC drive motors, two L298N dual-channel motor drivers.
- Relay module with 5 V DC miniature water pump and tubing.
- Flame sensors, infrared obstacle sensors, ultrasonic sensors.
- DHT11 digital temperature/relative humidity.
- MQ135 broad air-quality/gas sensor (label uncalibrated raw readings honestly; cannot honestly call it precise smoke concentration without calibration).
- ESP8266 for Wi-Fi.
- Camera hardware called "ESP8266 Cam" by the team, with **actual camera board model still to be verified**; do not assume ESP32-CAM until hardware confirmed.
- Lithium-ion power pack and switches; actual voltage, current, connector type, protection, and distribution require adult/teacher approval. No battery pack construction guidance.
- Whether an Arduino Uno remains as the rover motor/sensor controller is NOT confirmed. The ESP8266 alone may not have sufficient suitable I/O; defer hardware allocation to Saksham.

## User's responsibilities and target experience
Build the frontend of a live rover control center, with superb usability on mobile.

### Screen A: Dashboard (home)
- Clearly identified ROBOT / SIMULATOR connection state. Never show generated numbers as real telemetry.
- Big accessible tiles: **temperature °C**, **humidity % RH**, **MQ135 raw / relative air quality**, all with sensor source and last update.
- Show firmware-reported flame alerts, IR and ultrasonic obstacle indications, current mode, movement command acknowledgment, robot motion status, pump availability, fault or low-power warnings only where actual telemetry exists.
- Show state of Wi-Fi, last heartbeat, telemetry freshness, camera availability and a prominent emergency STOP button.

### Screen B: Manual driving
- Large touch-friendly Forward, Backward, Left, Right, and STOP controls or responsive D-pad.
- Motion only **while a control is held**. Release/cancel/blur/page visibility loss => transmit STOP promptly; don't send repeated stale commands.
- Adjustable speed preset or slider; actual speed limits are confirmed by robot capabilities.
- Switching to manual must wait for successful firmware mode acknowledgement.
- Do not queue movements when connection is lost; disable all movement actions while telemetry is stale or firmware reports a fault.
- **On-device watchdog** required: firmware stops motors if a command heartbeat expires. Browser handling is supplementary.

### Screen C: Autonomous mode
- Clearly labeled "INDOOR DEMO ONLY" and guarded enable/disable flow.
- Start from IDLE and require user action; switch only after firmware acknowledges.
- Indicate detected obstacles and navigation states: exploring, avoiding, stopped, fault, etc. Only display values received from firmware.
- Autonomy must stop on unexpected loss of essential ranging/IR input, actual faults, or physical/electrical STOP. If firmware can't confirm these guarantees, leave AUTO disabled.
- STOP is always accessible and prioritized over all other controls.

### Screen D: Camera / live view
- Create a responsive 16:9 video panel with states: NOT CONFIGURED, CONNECTING, LIVE, RECONNECTING, OFFLINE.
- The actual camera model may be ESP32-CAM, ESP8266-compatible camera variant, or another device. Do not choose a library or streaming URL until Saksham identifies it.
- UI may accept a *validated* LAN-only camera URL from firmware capabilities or same-origin gateway. Clearly describe mixed-content, CORS, local network and security issues; do not silently open arbitrary externally supplied URLs.
- Don't record, upload, or share video by default.
- Show placeholders when camera stream isn't supported.

### Screen E: System
- Board model, firmware version, API version, connected/disconnected status, raw telemetry diagnostics, sensor health, optional settings.
- Show capabilities and hidden/deactivated controls for unsupported functions.
- STOP and safe disconnect on every screen.

## Visual design
Aim for a polished, modern robotics command console: forest green, deep slate, alert amber/red used only for real statuses, clear typography, high contrast, compact but readable cards, subtle icons, intentional white space.

Responsive breakpoints: 320px, 390px, 768px, 1280px.
Mobile-first, thumb-accessible. Work in portrait and landscape. Respect reduced motion. Do not rely on hover for any essential interaction. Keyboard accessibility on desktop. Labels and data cards must remain readable without scrolling sideways.

## Technology stack
The repo already includes a dependency-free `web/index.html`, `web/styles.css`, and `web/app.js` prototype in **SIMULATOR ONLY** mode. Improve that existing starter first. You can propose React + TypeScript + Vite if justified, but do not migrate just to add frameworks; keep demo easy to host locally and easy for Saksham to integrate.

Prefer an explicit transport interface:
`MockRobotTransport` — deterministic, clearly simulated; can be used without hardware.
`HttpRobotTransport` or `WebSocketRobotTransport` — only once the firmware has a verified URL/endpoint and approved local access.

Treat docs/14_API_CONTRACT.md as the API source of truth. Use the endpoints/payloads documented there unless your team jointly revises them. Build explicit handling for errors, timeouts, capability negotiation, duplicated commands, mode acknowledgments and STOP priority. Never claim mocked states are live data.

## Communication/API, in coordination with Saksham
Proposed contract:
- GET `/api/v1/health` -> ready, firmware version, capabilities, server time.
- GET `/api/v1/telemetry` -> DHT11 temp/humidity, MQ135 raw/index, sensors, motion, mode, warnings, monotonic sequence and timestamp.
- POST `/api/v1/mode` with requested `idle|manual|auto`; mode change only after server ack.
- POST `/api/v1/drive` with press-and-hold direction, numeric safe speed, sequence.
- POST `/api/v1/stop` high priority, all motors stop.
- POST `/api/v1/pump` supported ONLY after Saksham confirms explicit guarded capability and an adult-reviewed real water system; disable by default.
- GET `/api/v1/capabilities` optional extras including camera.
- Optional `/ws` after firmware is confirmed to support it; not required to build a good initial UI.

Firmware, not browser, must own motor stopping and a bounded drive-command timeout. The frontend must never directly connect to exposed internet endpoints or include repository-stored passwords.

## Development phases — complete as much as verifiable
**P0 Discover**: Read repo, summarize existing UI and gaps; inspect git status. Do not overwrite unrelated work.
**P1 Mock interface**: Build high-quality mobile UI with obvious SIMULATED banner, fake sensor changes, accessible manual controls, 3 modes, obstacle preview and camera-unavailable state.
**P2 State and safety**: Implement a controller with explicit offline/stale/busy/fault handling, hold-to-drive, STOP on release/cancel/visibilitychange/blur, visible STOP and safe mode switching. Unit test state transformations.
**P3 API agreement**: Implement type definitions / JSON examples, capability detection and an adapter skeleton while keeping live connection disabled until Saksham supplies tested firmware API.
**P4 Live readiness**: Add retry/backoff logic, last telemetry age, errors, ack/command sequence handling; never auto-restart motors after reconnect.
**P5 Quality**: Improve a11y, keyboard controls, reduced motion, touch targets, no horizontal overflow, screenshot review of mobile breakpoints, and documentation.
**P6 Verification**: Run real tests and build commands available in the repo, record exact outcomes, mark hardware/network tests pending.
**P7 GitHub**: Commit improvements, push your branch, create PR back to baseline, include risks and integration checklist. Do not self-merge.

## Mandatory safety and correctness
- This is a supervised school model, not a real wildfire robot. Never instruct open flame, burning, smoke, heaters or live firefighting trials.
- No autonomous outdoor driving or unattended operation.
- A web STOP control cannot substitute for a real power switch or firmware watchdog.
- Auto mode cannot be represented as obstacle-safe without real validated sensor logic; keep feature unavailable in live mode until Saksham confirms it.
- All power and lithium-ion pack handling is the responsibility of an adult with a suitable protected, commercially assembled supply; do not provide DIY pack or charging instructions.
- MQ135 is a gas sensor, not an accurate smoke-density meter. Clearly distinguish raw counts/relative index from calibrated physical quantities.
- DHT11 has limited resolution and sample rate. Avoid aggressively claiming sub-second real readings.
- Pump is OFF and UI pump control DISABLED by default, subject to later separate integration approval.
- Confirm "ESP8266 Cam" module model; do not assume it already streams video.
- Do not invent physical tests, network endpoints, hardware measurements, URLs, pins or credentials.

## Deliverables
1. Mobile-compatible frontend source in `web/` with clearly labeled mock/demo mode.
2. Dashboard for temperature, humidity, MQ135 gas/air-quality sensor, mode, obstacles, flame indications and connection.
3. Manual direction controls with hold-to-drive + STOP.
4. Autonomous-mode status UI with supported/unsupported state.
5. Camera card with unavailable fallback and safe future integration point.
6. Versioned API adapter design and sample payloads.
7. Accessibility and responsive verification evidence.
8. Documentation updated (including team roles, UI test cases, API contract, limitations).
9. Commits pushed and PR opened, without overwriting Saksham's firmware.

## Final report
Give exact branch and PR URL, changed files, features, commands actually run, test outcomes, unresolved board/API questions, safe hardware handoff needs, and next action for each team member. Keep unfinished tasks honest. **Do not ask for secrets, Wi-Fi passwords or battery-pack assembly details.**

**Start now, work within the repository, and do not merely write another plan.**
