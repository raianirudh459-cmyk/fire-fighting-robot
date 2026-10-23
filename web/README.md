# Web dashboard — plain HTML, CSS and JavaScript

**Node.js is not required.** This application is deliberately dependency-free: no React, no TypeScript, no Vite, no npm scripts, no bundling, no cloud backend.

## Run
1. Open `web/index.html` in Chrome, Edge, Firefox or a mobile browser.
2. Or use VS Code's free Live Server extension if you prefer `http://localhost`; it is **optional**.
3. To see logic tests, open `web/tests.html` in the browser. It prints PASS/FAIL without any install.

GitHub does not automatically turn source files into a hosted website. For a phone preview, serve this folder from a trusted local device/network or use a separately configured static web host (never enable public robot-control endpoints). Opening a `file://` URL on your computer does not make the website available on another phone.

## Files
- `index.html` — semantic, accessible responsive layout.
- `styles.css` — mobile-first components at 320px, 390px, 768px and 1280px.
- `state.js` — small pure reducer and deterministic simulated telemetry.
- `app.js` — rendering, manual hold-to-drive controls, modes, scenarios and event log.
- `tests.html` + `tests.js` — browser-run logic assertions; not hardware tests.

## Simulation behavior
- Every data card says SIMULATED; values do **not** come from Saksham's rover.
- Try normal, obstacle, possible flame warning, sensor fault and simulated offline conditions with the diagnostics dropdown.
- MANUAL uses **press-and-hold** direction controls; release/blur/tab hide stops simulated movement.
- AUTO describes only simulated indoor obstacle behavior; **no autonomous driving firmware is implemented here**.
- STOP button and ESC reset the simulated movement to idle.
- Camera is a placeholder. The actual camera module named "ESP8266 Cam" remains unverified.
- Pump/relay has no controls and is disabled.
- MQ135 reports *raw readings* rather than unsupported smoke ppm/AQI claims.

## Safety & future integration
There is NO `fetch`, `WebSocket`, or hardware communication in the frontend. See `docs/14_API_CONTRACT.md` for the API proposal. A real adapter can be added only after Saksham validates board type, endpoint responses, on-robot motor watchdog/STOP, LAN authentication, fault handling, and motor safety with a teacher/adult. A web STOP button **never substitutes** for a physical switch and firmware safety mechanisms.

## Manual browser QA
Open the simulator at 320, 390, 768 and 1280 px; verify no horizontal scroll. Test touch and keyboard arrows, STOP, lost focus, missing readings, and mode changes. The automated pure-logic tests do **not** prove pointer events, visual responsiveness, sensor wiring or motor safety; those require separate manual/integration testing.
