# 13 — Mobile web dashboard specification (confirmed stack)

## Confirmed technology
- **HTML5** for semantic layout
- **CSS3** for responsive mobile-first styling
- **Vanilla browser JavaScript (ES6+)** for state, interactions and future local API access
- **No Node.js / npm / React / TypeScript / Vite / bundler required**
- Zero external frontend dependencies; open `web/index.html` from a desktop browser, or serve statically within a trusted LAN for mobile preview.
- Logic tests: `web/tests.html`, run directly in a browser.

## Files and responsibility
`web/index.html` owns markup; `web/styles.css` owns responsive styling; `web/state.js` owns pure simulator state and fixtures; `web/app.js` owns DOM interaction, status, event log; `web/tests.js` checks state behavior.

## Existing UI
- Sensor cards: DHT11 °C and %RH, MQ135 raw reading (uncalibrated; **not smoke ppm/AQI**), ultrasonic cm.
- Flame and IR/ultrasonic obstacle status cards, source label and time since sample.
- Visible **SIMULATOR ONLY** label and camera-not-configured state.
- IDLE / MANUAL / AUTO demo modes, simulated hold-to-drive D-pad, Escape STOP and tap STOP.
- Normal, obstacle, possible flame, missing-sensor and offline simulator scenarios.
- Internal simulated event history.

## Mobile acceptance
Test 320px, 390px, 768px, 1280px viewport widths, portrait and landscape; check no sideways overflow, visible STOP and usable thumb controls, focus states, Esc/keyboard/pointer release, pointer cancel, loss of window focus, reduced motion, button disabled/error state. Browser-only logic tests do not replace manual rendering checks.

## Required future handoff from Saksham
Exact controller and ESP8266/camera board, LAN API endpoints, response payload examples, capability flags, auth/origin constraints, command acknowledgment, firmware watchdog stop on command-loss, sensor sample timestamps/validity. Only after these are tested should the browser get a **separate opt-in LIVE adapter**. No automatic movement upon reconnect or replay of queued commands.

## Hosting
A plain static server can host HTML/CSS/JS without Node. Opening a local computer `file://` page does not make it accessible from a phone; use a controlled local static server or an approved static host for preview. **Do not expose actual robot control publicly.**
