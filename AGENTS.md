# Agent instructions — VANARAKSHAK 2.0

## Goal and ownership
This is a collaborative **school science-fair robot**. **The web application belongs to the user; robot firmware, autonomy, sensor integration and electrical design belong to teammate Saksham.** Follow the assignment in `CODEX_STARTER_PROMPT.md` and docs/13–17. Prioritize a robust **mobile-first web interface** rather than writing speculative hardware-specific firmware.

## Mandatory engineering constraints
- Never claim the rover is safe for or capable of actual forest-fire suppression or emergency detection.
- No flames, smoke, heat testing, real-fire trials, or autonomous outdoor movement. Demonstrate with safe simulated flags and indoor obstacles.
- Treat camera PCB identity ("ESP8266 Cam") as unresolved; do not invent a stream endpoint or claim it is ESP32-CAM until checked.
- MQ135 must not be shown as accurate smoke ppm/CO₂ without proper sensing/calibration and explicit provenance. Prefer `mq135Raw` + relative air-quality index / "uncalibrated" label.
- DHT11 temperature and humidity readings must always have timestamps and stale/missing state.
- Never infer exact pin mappings, battery wiring, module ratings or voltage compatibility from names alone.
- Lithium-ion battery system must use an assembled, protected, adult-verified commercial supply; no cell-assembly, battery-pack construction or charging guidance.
- Real pump/relay action defaults **disabled** in firmware and UI until independently reviewed for water/electronics separation.
- Robot must have **on-device** command timeout/watchdog and collision stops. Browser-side safety controls are defense in depth, not substitutes.
- No public port-forwarding, unauthenticated internet deployment, or hard-coded passwords/tokens.

## Source and preservation
- `web/` is the new front-end. A self-contained mock demo is encouraged; visibly mark all telemetry SIMULATED and prevent confusing it with real hardware.
- `docs/14_API_CONTRACT.md` governs live commands/telemetry. Coordinate any API changes with Saksham. Be explicit about version negotiation, unavailable fields, failure states and stop semantics.
- `firmware/` is reserved for code authored/approved by Saksham after exact controller identification.
- `src/`, `include/`, `platformio.ini`, `test/` are **legacy stationary Arduino Uno demonstration**, NOT verified 4WD rover firmware; don't promote or erase them.
- Never delete the prior ESP8266 placeholder, LICENSE, Git history or unrelated user content.

## UI priorities
1. Accurate responsive mobile layout, high-contrast accessible buttons, readable tap targets.
2. Connection badge + telemetry freshness + last-updated time.
3. DHT11 temperature (°C), humidity (%RH), MQ135 raw/relative air-quality display; no fabricated precision.
4. Optional camera viewer with unavailable state.
5. IDLE / MANUAL / AUTO clearly differentiated; show mode acknowledgment from firmware rather than optimistic changes.
6. Directional press-and-hold controls; STOP on pointerup/cancel, blur, page hide, disconnect; persistent physical stop remains firmware responsibility.
7. Prominent STOP command; all controls disabled in offline or stale/fault conditions.
8. No "pump ON" control in live mode until explicit capability and reviewed authorization.
9. Responsive tests at 320px, 390px, 768px, 1280px widths.
10. Keyboard access, visible focus styles, reduced-motion consideration and safe handling of touch events.

## Work and GitHub
- Read repository content and docs before coding. Avoid unnecessary packages/complex frameworks.
- Code in a feature branch. Do not merge into `main` without human review.
- Do not modify firmware-owned files unless Saksham explicitly agrees on the new contract.
- Maintain a mock backend so development and testing don't require an active robot.
- Run actual lint/tests/build where tools exist; never fabricate passes or real sensor measurements.
- Update docs/15_TEAM_WORKFLOW.md with handoff contracts, not private tokens or passwords.
- Clearly enumerate known unknowns before deployment.
