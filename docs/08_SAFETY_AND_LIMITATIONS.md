# 08 — Safety, scope and ethical limitations

**This is a school demonstration robot. Never take it to an active fire, burn anything to test it, create smoke/heat for sensors, or drive autonomously unattended.** It is not an emergency alarm or suppression system.

## Power and motion
- Use only an appropriate **commercially assembled, protected** power supply reviewed by an adult/teacher; do not build lithium-ion packs, connect loose cells, improvise charging, or bypass protection.
- Keep physical OFF switch reachable; unplug before rewiring. Motor driver current and heat dissipation need adult verification.
- Keep rover on a low-speed indoor test surface and within an uncluttered contained arena.
- Firmware must stop motors after manual-command timeout and on fault; STOP button on webpage cannot replace firmware and physical stop.
- Do not enable autonomous movement until obstacle sensors and on-device failsafes are verified by Saksham in a controlled setup.

## Pump and water
- Pump and relay remain OFF until adult checks motor/relay ratings, waterproofing and safe separation of liquid from electronics.
- Never test with water near exposed controller boards, battery connectors or USB sockets.
- A visual LED/paper-nozzle demo fulfills the water-response storytelling goal without a working pump.
- Do not instruct a student to aim water at fire or another person.

## Sensor limitations
- DHT11 readings have limited resolution, update rate and accuracy.
- MQ135 reacts to multiple gases; its raw ADC output is NOT a smoke concentration or air-quality index standard without calibration and interpretation.
- Cheap IR and flame sensors are susceptible to interference/false readings.
- Ultrasonic sensing may miss small, angled or soft obstacles.
- Camera module model and support are currently unknown; do not assert a live stream exists before verified.
- Signal strength and smartphone controls are not substitutes for certified safety hardware.

## Cyber and privacy
- Use a trusted local Wi-Fi network; no direct exposure to internet, public tunnel, or default open unauthenticated control port.
- Avoid hard-coded secrets in web source or GitHub.
- Do not record/upload camera footage or telemetry to third-party cloud services by default.
- Server must validate commands and origin/authentication; never trust front-end role restrictions alone.

## Honest claims
Describe *simulation* as simulation. Show "unavailable" for missing fields, acknowledge uncalibrated readings, and never claim real firefighting capability.
