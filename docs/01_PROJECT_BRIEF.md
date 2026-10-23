# 01 — Project brief (VANARAKSHAK 2.0)

## Problem statement
Forest wildfires can damage plants, animals and habitats. This tabletop/mobile science-fair model demonstrates the *ideas* of remote monitoring, remote operation, autonomous obstacle avoidance and water delivery. **It is not designed to detect, enter or suppress actual fires.**

## Robot: agreed components
Four DC wheel motors, **two L298N drivers**, relay module, 5 V pump, tubing, wires, switches, flame sensor modules, infrared obstacle sensors, ultrasonic ranging sensors, ESP8266, a camera device presently called "ESP8266 Cam", lithium-ion battery system (safety/protection must be approved), MQ135 gas sensor, and DHT11 temperature/humidity sensor. Exact models, quantity of each sensor, main motor controller, camera chipset, motor current and regulated supply are pending confirmation by Saksham.

## Modes
- **IDLE** — outputs stopped; default after startup.
- **MANUAL** — mobile browser controls direction while pressed; stops on release or missed firmware command timeout.
- **AUTO** — supervised, low-speed, indoor obstacle avoidance; requires explicit firmware acknowledgment and safety interlocks.
- **FAULT/STOP** — inhibit motion; motors stopped by robot firmware, operator informed.

## Innovative features
1. A **responsive mobile web dashboard** that shows live sensor telemetry (when connected) and camera availability.
2. Two driving modes with clearly indicated handoffs.
3. Indoor autonomous obstacle detection and avoidance demonstration.
4. Optional remotely requested relay/pump with disabled-by-default water operation subject to adult review.
5. Reused/recycled forest environment with wildlife safety story.

## Team ownership
**You:** UI and web transport integration, simulated backend, camera panel, data cards, device states and responsive tests.  
**Saksham:** controller selection and firmware, movement algorithm, sensor acquisition, Wi-Fi protocol, on-robot safety and hardware testing.  
**Together:** choose and sign off JSON payloads and acceptance tests before enabling real motors.

## Competition guidelines
Eco-friendly reusable materials, a model that illustrates detecting forest-fire conditions and protecting wildlife, at least one innovative feature, a clear environmental explanation, name/slogan on display, completed 3D model, and a five-minute jury pitch.

## Boundaries and definition of success
Done: responsive UI runs in a labeled simulator; published contract reviewed by Saksham; live telemetry/motion only enabled after real firmware is tested; low-speed rover passes supervised obstacle tests; no-flame demo tells an honest environmental story. Do not mark physical tasks done until demonstrated.
