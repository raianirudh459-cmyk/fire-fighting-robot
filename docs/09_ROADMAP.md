# 09 — Revised project roadmap and owners

## Milestone 0 — Shared project definition
- [x] Record updated 4WD parts inventory and team responsibilities.
- [x] Replace Arduino-only spec with mobile robot and web UI architecture.
- [x] Publish Codex prompt for frontend work.
- [ ] Saksham confirms exact primary controller and actual camera chip.
- [ ] Both agree on API v1 and supported features.

## Milestone 1 — Web UI (your role)
- [x] Define responsive dashboard/telemetry, control and camera specification.
- [x] Prepare simulated dashboard starter with **no live connection**.
- [ ] Test on actual Android and/or iOS browser and laptop.
- [ ] Validate accessibility and mock motion-stop behavior.
- [ ] Add live transport after Saksham completes a tested endpoint.
- [ ] Add real stream after camera PCB identification.

## Milestone 2 — Robot firmware (Saksham)
- [ ] Adult-approved protected power, switches and actual wiring schematic.
- [ ] Four-motor control on two verified L298N drivers.
- [ ] Ultrasonic + IR sensor obstacle detection and safe-stop.
- [ ] DHT11 and MQ135 sensor acquisition.
- [ ] Flame sensor status; no flame/smoke testing.
- [ ] Wi-Fi local protocol v1, validation, motion watchdog.
- [ ] IDLE / MANUAL / AUTO / FAULT with appropriate safety interlocks.
- [ ] Camera module verification and capability advertisement.

## Milestone 3 — Joint integration
- [ ] Agree fixture JSON and timestamp/units/naming.
- [ ] Verify all STOP/fault/heartbeat cases before real driving.
- [ ] Compare reported DHT11 values with a suitable reference instrument.
- [ ] Mark MQ135 readings uncalibrated until responsibly validated.
- [ ] Connect web telemetry, controls and acknowledgement states.
- [ ] Indoor low-speed obstacle course, supervised by adult.
- [ ] Optional pump reviewed separately; defaults remain OFF.

## Milestone 4 — Presentation
- [ ] Recycled 3D forest model and clear signage.
- [ ] Physical battery and movement inspection by an adult/teacher.
- [ ] Print web UI screenshots clearly labeled MOCK or LIVE.
- [ ] Rehearse the five-minute joint talk.
- [ ] Record test evidence and document remaining limitations.

**Definition of done:** Only mark a real-time, live camera, autonomous navigation, or actual sensor feature complete when it is physically demonstrated and logged. The preview UI is currently a simulator.
