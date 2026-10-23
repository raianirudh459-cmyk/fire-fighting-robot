# 09 — Implementation roadmap

## M0 — Repository foundation
- [x] README, hardware plan, source files, test definitions, Codex instructions.
- [x] GitHub feature branch to preserve existing project.
- [ ] Review and merge PR after the checks.

## M1 — Compiling firmware
- [ ] Run GitHub Actions and resolve compilation errors.
- [ ] Build firmware using PlatformIO for `board = uno`.
- [ ] Upload to a verified Arduino Uno R3.
- [ ] Check LED, buttons, buzzer, servo, and Serial Monitor.

## M2 — Calibrated sensors
- [ ] Inspect LM35 package/datasheet and confirm wiring.
- [ ] Compare ambient LM35 output with an independent thermometer.
- [ ] Note digital flame sensor's actual active level under non-fire ambient tests.
- [ ] Write any threshold/polarity adjustments in the test log.

## M3 — Eco-friendly diorama
- [ ] Recycled 50 × 35 cm cardboard base.
- [ ] Paper forest canopy and wildlife corridor.
- [ ] Label compartments, sensor locations, and outputs.
- [ ] Ensure water tank remains a dry visual prop or isolated as instructed.
- [ ] Display a project name and slogan prominently.

## M4 — Demo readiness
- [ ] Verify buttons and water-saving cycle without a pump.
- [ ] Print one-page wiring table and 5-minute speech.
- [ ] Rehearse 3 full presentations.
- [ ] Prepare answers about sensor limitations and model safety.

## M5 — Optional, not needed for event
- [ ] Adult-reviewed 5 V MOSFET + miniature pump + diode driver.
- [ ] Separately powered isolated water path and leak test.
- [ ] Additional measured low-tank sensor.
- [ ] Detailed telemetry or a low-power display.

## Definition of done
The source compiles, dry demonstration works without any flames, parts and signals match docs, water is safely isolated, rubric criteria are clear, and student can explain limitations within five minutes.
