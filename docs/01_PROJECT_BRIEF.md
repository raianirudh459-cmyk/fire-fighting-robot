# 01 — Project brief and success criteria

## Working identity
- **Title:** VANARAKSHAK — The Forest Fire Fighter
- **Slogan:** Detect Early. Spray Smart. Save Forests.
- **Mission:** Teach how early warnings and responsible, water-saving response can support forest and wildlife protection.
- **Audience:** School science-fair judges and students; five-minute presentation.
- **Nature:** Static, low-voltage educational diorama with a moving nozzle. Not a free-roaming real-world firefighting robot.

## Environmental problem
Wildfires can damage forests, habitats, soil quality, air quality, and biodiversity. Early detection provides a better opportunity for trained responders to intervene. A small educational model cannot actually protect a forest; it illustrates the idea.

## Features
1. Monitor a digital flame sensor (typically active LOW) and an analog LM35 temperature sensor.
2. Show a **CAUTION** state if one input looks suspicious.
3. Request a **CONFIRMED** response only if both sensor conditions persist for 2 seconds.
4. Provide a safe push-button DEMO override so visitors see the full model without igniting anything.
5. Sweep an SG90 nozzle from roughly 60 to 120 degrees.
6. Pulse a blue LED (or later an adult-reviewed 5 V pump) for 3 s on / 7 s off.
7. Inhibit spraying when an extra low-water demo button is held.
8. Explain a paper wildlife escape corridor, low-cost reused materials, and water conservation.

## Boundaries
- In scope: UNO firmware, electronics layout, sensor readings, LEDs, piezo, one servo, two buttons, a water-saving state machine, cardboard craft, testing checklist, presentation.
- Optional after adult inspection: a very small 5 V pump supplied separately.
- Out of scope: actual wildfire detection, exposure to real fire/smoke, emergency communications, autonomous driving, drones, mains-voltage wiring, batteries assembled by students, precise fire-risk prediction, certification.

## Acceptance criteria
- A button press enters demo response; second press returns to ready.
- READY: green LED ON; SPRAY LED OFF.
- CAUTION: red LED and buzzer warn, no spray.
- CONFIRMED: blue LED pulses for 3/7 seconds; servo pans.
- LOW WATER: suppress blue LED and pump signal; warning continues.
- No pump activation at start or when output is disabled in config.
- All wiring labels correspond to docs/12_PIN_MAP.md.
- Adult-reviewed water/electronics separation, no-flame demonstration.
- Model name, slogan, reuse story, biodiversity outcome, five-minute pitch clearly visible.

## Deliverables
Source, schematic tables, build plan, bill of materials, test plan, FAQ, judging checklist, Codex prompt, GitHub PR. Photos of final assembly are a **future manual task**, not fictional evidence.
