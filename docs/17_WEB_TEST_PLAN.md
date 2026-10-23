# 17 — Dependency-free web testing plan

## Setup (no Node.js)
Open `web/index.html` for the simulator. Open `web/tests.html` for the no-install browser logic suite. It depends only on `state.js` and `tests.js`; no npm/React/Vite dependencies or network access.

## Pure logic coverage (browser assertions)
- Boot in IDLE and STOPPED.
- Reject movement in IDLE or AUTO.
- Accept allowed directions in MANUAL.
- Reject unknown direction.
- STOP releases movement without leaving manual.
- Emergency STOP can force IDLE.
- Disconnect/fault resets motion and disables driving.
- Returning from offline remains IDLE until explicitly rearmed.
- Scenario change clears movement.
- Simulated telemetry has source label, MQ135 uncalibrated.
- No readings for offline/missing scenarios.
- Missing values display as an em dash, never numeric zero.
- Speed request clamped to limited simulated range.
- Sample age logic produces reasonable seconds.

## Manual browser testing required (NOT asserted complete)
- 320, 390, 768, 1280px responsive; no horizontal overflow.
- Mobile portrait/landscape thumb tap targets.
- Pointerdown/held/release on D-pad, pointercancel, dragging away, browser blur, page hide and keyboard keyup.
- Escape and both STOP buttons; STOP also during AUTO.
- Accessible focus and labels; no annoying frequent screen-reader announcements.
- Normal/obstacle/flame/missing/offline scenario displays.
- Event log updates; last sample freshness.
- Camera unavailable placeholder and pump-disabled status.
- If enabling future LIVE mode: reject stale/unauthorized/replayed commands, independent on-device stop watchdog, API mode ack and manual real-hardware supervised tests.

## Team ownership
You: DOM, usability, accessibility, test results.
Saksham: motor and sensor firmware, API, hardware reliability, command-timeout motor stop and physical testing.
Joint: accept live integration only after safety and network review.
