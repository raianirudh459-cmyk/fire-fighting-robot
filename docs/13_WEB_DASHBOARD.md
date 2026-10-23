# 13 — Responsive web dashboard design (your ownership)

## Core goal
A clean mobile-first dashboard for a low-speed educational 4WD rover. Support a realistic demo even when no robot is attached, but distinguish **SIMULATED** from **LIVE** visually and in text.

## Proposed information architecture
- **Overview:** connection, last update, temperature °C, humidity %RH, MQ135 raw/relative index, motion mode, alerts.
- **Drive:** large forward/back/left/right press-and-hold controls, speed slider (actual firmware cap), high-priority STOP, mode switch.
- **Autonomy:** indoor obstacle-avoidance status and stop controls; cannot claim safety unless hardware passed.
- **Camera:** optional 16:9 viewer, verify hardware, no recording/cloud uploads, graceful unavailable state.
- **System:** firmware version, API capability, sensor validity, connection retries/errors, version compatibility.

These can initially appear as one responsive page with grouped panels, expandable for future routing.

## Responsive layout
| Screen | Layout |
|---|---|
| 320–389 px | Single-column readable cards, large tap targets, never horizontal-scroll |
| 390–767 px | Single-column with a simple D-pad and reachable STOP |
| 768–1199 px | Two columns for stats and controls; camera next to status |
| >=1200 px | Flexible panel grid optimized for desktop |

Use semantic HTML, descriptive buttons and labels, keyboard focus, contrast, meaningful aria-live changes, touch-action handling, reduced-motion support. In landscape mode, keep STOP easily accessible.

## Card requirements
**Temperature:** value in °C, last sample age, validity. **Humidity:** %RH. **MQ135:** "Gas / air-quality sensor (raw)" plus raw counts or relative baseline index. Do not call raw counts "smoke ppm" or "AQI"; these are scientifically different measurements. **Obstacle:** only real reported flags/distance. **Flame:** sensor state as a *possible warning*, not certain fire.

## Controls and motion behavior
Manual:
- Show movement button active only while it is pressed.
- Pointerdown sends start/refresh request only after manual mode acknowledged.
- Pointerup, pointercancel, lost pointer capture, page hide and window blur send STOP.
- Avoid accidental drag touch scroll; provide stop when held interaction ends.
- Disable controls when connection stale, wrong mode, fault or command rejected.
- Firmware must stop motors independently after missed heartbeat.

AUTO:
- Requires deliberate operator action; refuse if capability/sensor health unavailable.
- Never auto-transition into motion after reconnect.
- Show actual firmware navigation status and error.

STOP:
- Always prominent, usable with touch and keyboard.
- Prioritized and safe to request even when other controls disabled.
- On connection loss, show explicit "unable to confirm STOP" unless firmware ack exists; rely on hardware watchdog and physical switch.

## Camera
Treat this as optional until exact hardware verified. Use a static placeholder with model not configured. Future live feature must validate local stream address/capabilities, handle disconnected state, not auto-upload or record.

## Visual concept
Forest green accents, deep slate/white surfaces, clear dashboard hierarchy, red reserved for real stop/fault state, amber for unverified or stale. Avoid misleading flashing alarms in simulation.

## Web preview
`web/index.html` opens directly from disk and runs **only a mock controller**. All sensors/commands are simulated. This ensures your work can progress before Saksham's hardware integration.
