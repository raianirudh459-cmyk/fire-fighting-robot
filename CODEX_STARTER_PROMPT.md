# CODEX STARTER PROMPT — VANARAKSHAK 2.0 (VANILLA WEB ONLY)

You are a senior frontend engineer specializing in accessible mobile dashboards and local-network IoT interfaces. Continue VANARAKSHAK 2.0, a **school demonstration** four-wheel forest-protection rover operated by a two-person team.

## Non-negotiable technology choice
**KEEP HTML5, CSS3, and plain browser JavaScript.** Do **not** add React, Vue, Angular, Svelte, TypeScript, Vite, webpack, npm packages, Node.js runtime dependencies, package.json, backend framework, CDN scripts, or third-party paid services. The frontend should run by opening `web/index.html`; the browser test page `web/tests.html` also runs without installing anything. A static server may be used for later controlled testing if required, but there is no build step.

## GitHub
Repository: `raianirudh459-cmyk/fire-fighting-robot`
Latest frontend branch: `feature/web-dashboard-vanilla-v2`.
Read `AGENTS.md`, `README.md`, `web/README.md`, `web/index.html`, `web/styles.css`, `web/app.js`, `web/state.js`, `web/tests.js`, and all docs 13–17 before modifications. Create a new task branch from the **latest frontend branch**, rather than starting again from old stationary Arduino code; send your changes through a reviewable PR. Leave `main` and Saksham's firmware untouched.

## Product concept
VANARAKSHAK — Detect Early. Respond Smart. Protect Forests.

Hardware planned by the team: four DC motors, two L298N motor drivers, relay module, 5 V water pump with tubing, flame/IR/ultrasonic sensors, ESP8266, camera board ambiguously described as "ESP8266 Cam", protected commercial lithium-ion supply, MQ135 gas/air-quality sensor, DHT11 temperature/humidity sensor and switches. Saksham handles hardware, embedded software, autonomy, safety and Wi-Fi API; user handles responsive frontend and its API adapter. Board selection and actual camera chipset remain unverified. Old `src/`, `include/`, `platformio.ini` Arduino Uno project is LEGACY and is NOT rover firmware.

## Existing frontend architecture to preserve/improve
- `web/index.html` — semantic accessible markup and responsive dashboard sections.
- `web/styles.css` — no-framework mobile responsive styling.
- `web/state.js` — pure state/reducer and deterministic mock sensor fixtures; no network.
- `web/app.js` — simulated user interactions, keyboard/pointer handling, rendering, events.
- `web/tests.html` + `web/tests.js` — dependency-free browser logic tests.
- `web/README.md` — no-install setup instructions.

Keep the UI visually polished, accessible and light. Separate transport, state and presentation logic rather than making one giant script. If an eventual live API adapter is added, make **SIMULATOR** and **LIVE** independent explicit modes; don't ship live driving unless Saksham validates firmware capabilities and stop watchdog.

## Web dashboard requirements
1. Temperature in °C and humidity in %RH from DHT11, with validity and sample age; show — when unavailable.
2. MQ135 gas/air-quality **raw** sensor reading and optional verified relative index, never invent calibrated smoke ppm or regulatory AQI.
3. Flame alert and infrared/ultrasonic obstacles with clear sensor validity and simulated/live data source.
4. Manual hold-to-drive direction pad usable by touch, mouse and keyboard. Release/cancel/window blur/tab hide means STOP. Never latch a movement on click.
5. A clearly distinguishable IDLE / MANUAL / AUTO indoor-demo mode display; robot must acknowledge any future live mode change.
6. A prominent STOP button, keyboard Escape shortcut, and on-device watchdog required for actual safe stop.
7. Live view camera panel with "NOT CONFIGURED" placeholder until actual camera board and local stream URL are verified. No recording/upload.
8. Status/error/scenario panel showing simulator, offline, missing sensor, obstacle, simulated flame warning, last sample, and command events.
9. 320, 390, 768 and 1280px layouts, no horizontal overflow, ≥44px primary touch targets, semantic markup, useful focus and reduced-motion styles.
10. Pump control omitted/disabled by default until adult safety review and firmware capability negotiation.

## Development tasks to execute
- Inspect and run existing frontend (browser). Test `web/tests.html` and record actual test outcomes; don't fabricate.
- Improve simulator correctness and control event handling; identify and fix any pointer/keyboard interaction bugs.
- Test disconnected/stale/malformed sample handling and mode transitions in pure logic.
- Add further browser-native tests and document what they do **not** cover.
- Verify accessible interactions and mobile viewport support using available browser tools, if available. Report actual widths/checks.
- Extend API-contract-ready architecture from `docs/14_API_CONTRACT.md` but keep real transport off until hardware and API verified.
- Coordinate with Saksham regarding exact controller, Wi-Fi endpoints, versioned JSON fields, auth and motor stop guarantees.
- Document limitations, no-install steps, and real integration acceptance criteria.
- Commit changes on a new feature branch, push them, and open a PR; do not merge into main automatically.

## Explicitly not allowed
No real-fire/smoke/heat tests. No unsupervised autonomous rover movement. No lithium-ion pack assembly/charging guidance. No made-up camera stream, pin maps, sensor precision or "live" claims. No unauthenticated public robot-control endpoints, hardcoded secrets, or pump activation without adult review.

## Suggested integration design (proposal only)
HTTP local LAN API `/api/v1/health`, `/api/v1/capabilities`, `/api/v1/telemetry`, `/api/v1/mode`, `/api/v1/drive`, `/api/v1/stop`; see docs/14. Motion packets must not replay after a disconnect and must be independently bounded by firmware command watchdog. Telemetry has validity/timestamp; live control disabled on stale/fault conditions. STOP acknowledgment must be distinguished from mere browser button click.

## Finish
Summarize changed frontend files, tests actually run and results, screenshots if actually captured, responsive/a11y findings, unverified hardware/API issues, branch and PR link. Highlight next steps for the user and Saksham. **Execute development work, not merely create another plan.**
