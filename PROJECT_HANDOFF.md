# VANARAKSHAK 2.0 — Project handoff and paused-development checkpoint

**Checkpoint date:** 2026-10-24 (Asia/Kolkata)  
**Status:** **PAUSED — do not continue development, change hardware, merge pull requests, or deploy live robot control until Saksham reviews and approves the direction.**  
**Purpose:** Preserve decisions, existing code, branches and next steps so a future ChatGPT/Codex session can resume without reconstructing the conversation.

## 1. Project at a glance

**Name:** VANARAKSHAK 2.0 — The Forest Fire Fighter Rover  
**Slogan:** Detect Early. Respond Smart. Protect Forests.  
**Scope:** An educational four-wheel mobile robot/science-fair model demonstrating environmental monitoring, supervised manual driving, proposed supervised obstacle-avoidance mode, and an optional water-response concept. This is not a real firefighting, alarm, or emergency-response device. Use safe indoor demonstrations without flame, smoke, heat or hazardous testing.

**The latest instruction:** Stop further development now; preserve GitHub work and await teammate **Saksham's approval**.

## 2. Team ownership

| Owner | Workstream |
| --- | --- |
| User | Mobile-compatible web dashboard, HTML/CSS/JS UI, sensor cards, camera placeholder, manual/auto controls UI, state and networking integration later |
| Saksham | Exact controller/board selection, Arduino/ESP firmware, four motors and two L298N drivers, sensors, supervised autonomous logic, on-device watchdog, API server, relay/pump integration after adult review |
| Both | Versioned JSON API agreement, hardware safety sign-off with adult/teacher, integrated testing, science-fair model and presentation |

Do not overwrite the other developer's changes. Before any hardware integration, agree on exact board models and API responses.

## 3. Hardware inventory as stated by the team

- Four DC motors and **two L298N** motor drivers.
- Relay module, **5 V DC pump**, tubing and wires.
- Flame sensor(s), infrared obstacle sensor(s), ultrasonic sensor(s).
- ESP8266 Wi-Fi module.
- Camera described as "ESP8266 Cam"; **the exact board/chipset is unverified** (do not assume ESP32-CAM or a stream URL).
- DHT11 temperature/humidity sensor.
- MQ135 broad gas/air-quality sensor. Raw readings are **not** scientifically justified smoke ppm or regulatory AQI readings.
- Lithium-ion power and switches: require commercially assembled, protected solution and adult/teacher review; do not improvise battery pack assembly/charging.
- **Main control MCU not yet confirmed**. Earlier Arduino Uno demonstration existed, but Uno is *not confirmed* for the new rover. ESP8266 GPIO/ADC limitations must be considered by Saksham.

## 4. Driving and web requirements

- **IDLE:** default, stopped.
- **MANUAL:** controlled by phone/laptop D-pad, press-and-hold movement and STOP on release/cancel/blur/tab hide; speed request constrained by firmware.
- **AUTO:** deliberately enabled, supervised **indoor obstacle-avoidance demo only**, with sensor-failure stopping on the physical robot. Do not enable live AUTO until validated by Saksham.
- **STOP:** permanently prominent web command; **firmware must enforce a command-expiry watchdog and support a physical master OFF**. A browser button does not replace these safeguards.
- **Dashboard:** temperature in °C, humidity in %RH, MQ135 raw or honest relative readings, obstacle/front distance, flame warning, connection state, sample freshness, motion mode, optional camera, firmware faults.
- **Camera:** unavailable placeholder until actual board and local stream validated. No recordings or public webcam URLs by default.
- **Pump:** real relay and pump remain **disabled** by default until independent adult-reviewed electrical/water safety checks.
- **Security:** prospective live controller accessible only on a secured trusted local network; do not expose commands to public internet or store credentials in repo.

## 5. LOCKED technology decision

**Web interface:** HTML5 + CSS3 + vanilla browser JavaScript (ES6+).  
**No Node.js/npm, React, TypeScript, Vite, webpack, cloud backend or frontend package installation required for the chosen web dashboard.**  
The existing simulator opens directly via `web/index.html` and pure-logic test page via `web/tests.html`. No web bundler and no actual robot connections exist in the chosen frontend branch.

Possible future communication, subject to a joint written agreement: local Wi-Fi HTTP/JSON REST API and optionally WebSocket. The provisional endpoints/payloads are in `docs/14_API_CONTRACT.md`. Do not assume they are implemented.

## 6. GitHub status (remote snapshots verified on 2026-10-24)

Repository: [raianirudh459-cmyk/fire-fighting-robot](https://github.com/raianirudh459-cmyk/fire-fighting-robot) (**public**)

| Branch | Latest known commit *before this checkpoint* | Meaning |
| --- | --- | --- |
| `main` | `5b6654a27489422d1579b27f1dc20d15ca347c6e` | Original default branch; kept unchanged |
| `feature/vanarakshak-uno-foundation` | `21dff0ee0c20fcd036b98b844d0727bdf7b8b448` | V2 requirements, docs and initial simulator |
| `feature/web-dashboard-vanilla-v2` | `34ad8a21a5a7c585bc85cee6a77fcc42ceaafe46` | **Chosen frontend branch**; checkpoint file now adds another commit |
| `codex/web-dashboard-v2` | `7b13dd32f85bcb55a4a20a3d269516012b36a41b` | Separate Codex UI development; preserve independently |
| `patch-1` | `100502be70791b780ee1956f2d19b8a81fb4d3e3` | Separate change to legacy `code for esp 8266` file; not merged |

**Open DRAFT pull requests (do not merge without review):**
- [PR #1](https://github.com/raianirudh459-cmyk/fire-fighting-robot/pull/1): `feature/vanarakshak-uno-foundation` -> `main`; V2 project foundation/docs.
- [PR #3](https://github.com/raianirudh459-cmyk/fire-fighting-robot/pull/3): `feature/web-dashboard-vanilla-v2` -> `feature/vanarakshak-uno-foundation`; **preferred vanilla HTML/CSS/JS frontend**.
- [PR #2](https://github.com/raianirudh459-cmyk/fire-fighting-robot/pull/2): `codex/web-dashboard-v2` -> `feature/vanarakshak-uno-foundation`; **another unfinished/alternative frontend** with overlapping files, including `.cjs` development/test files. Do not merge it blindly into PR #3 or assume its approach matches the no-Node choice.

These are GitHub **remote** statuses. They do **not** prove a user's local VS Code or Codex workspace lacks uncommitted changes. To check a local checkout: `git status --short --branch`; if needed, review files, commit and `git push` to the correct branch *after* the team authorizes work. Do not force push.

### Continuous integration and verification
Recent GitHub Actions **"Arduino UNO firmware and logic tests"** runs concluded successfully on the web branch at `34ad8a21...`, including [run #40005974505](https://github.com/raianirudh459-cmyk/fire-fighting-robot/actions/runs/40005974505). That workflow covers **legacy stationary Arduino Uno** code, NOT the 4WD rover, web visual responsiveness or live device safety. The new browser tests exist but **their manual execution and mobile-device rendering checks have not been independently verified** in this checkpoint.

## 7. Saved frontend files

- `web/index.html`: accessible responsive single-page command console with metric cards, mode switch, D-pad and STOP, diagnostics, camera placeholder, event log.
- `web/styles.css`: dependency-free mobile-friendly styling, 320px/390px/768px/1280px intended widths.
- `web/state.js`: pure simulated state machine, clamped mock speed and deterministic telemetry fixtures.
- `web/app.js`: simulated controls and DOM; pointer/keyboard release and page blur/visibility STOP handling, simulator scenario switch.
- `web/tests.html` + `web/tests.js`: browser-based pure logic assertions (no Node), pending direct verification.
- `web/README.md`: no-install setup and testing instructions.
- `CODEX_STARTER_PROMPT.md`: detailed *no-Node, vanilla web only* Codex future-development prompt on the preferred frontend branch.
- `AGENTS.md`: collaboration and safety constraints.
- `README_WEB_STACK.md`: stack decision note.
- `docs/01...17`: project, parts, safety, UI, proposed API, teamwork, roadmap and tests.
- `src/`, `include/`, `platformio.ini`, `test/fire_logic_test.cpp`: **legacy Uno stationary model**; not valid proof of 4WD firmware.

## 8. Hosting and collaboration decisions

Recommendation communicated: add Saksham as a repository collaborator for code review and separate branches. Optionally host the **simulator-only static frontend** on GitHub Pages for easy phone viewing, with deployment from the `web/` folder via an appropriate workflow. **GitHub Pages setup and a verified public preview URL are NOT confirmed completed.**

Never publish a direct internet-facing rover control endpoint through GitHub Pages. Actual robot control, if later approved, should run on a secured local network.

## 9. Pending review and blockers

1. **Saksham's explicit approval** to continue development and agree with web/firmware split.
2. Review PR #2 and #3 together to decide which frontend implementation to keep; preserve both until a human decides.
3. Confirm actual camera chip/board and main controller.
4. Confirm how four DC motors/two L298N drivers and sensors will be safely supported, including exact interface voltage/current requirements with a teacher.
5. Agree on API v1 commands, timestamps, sensor validity, capabilities, authentication, real STOP/watchdog behavior and failure states.
6. Review protected commercial battery power and optional pump/water installation with responsible adult.
7. Run browser-only logic tests and real responsive/mobile/manual-interaction checks.
8. Merge only chosen reviewed PRs in an intentional order; do not self-merge now.
9. Decide whether to enable GitHub Pages for **simulation only** after review.
10. Plan joint indoor, no-flame testing only when firmware and hardware safety prerequisites are satisfied.

## 10. How to resume in a new chat

Suggested continuation instruction:

> Continue VANARAKSHAK 2.0 from the GitHub repository `raianirudh459-cmyk/fire-fighting-robot`. Read `PROJECT_HANDOFF.md` on `feature/web-dashboard-vanilla-v2`, `AGENTS.md`, `CODEX_STARTER_PROMPT.md`, docs/13–17 and both outstanding dashboard PRs. The user owns the web interface, Saksham owns firmware. Our chosen frontend stack is HTML, CSS and vanilla JavaScript with **no Node.js**, unless explicitly changed. The current frontend is simulator-only. Do not merge, push new functionality or enable real motors/pump until the user confirms Saksham's approval. After approval, reconcile competing PR #2 vs #3 intentionally, then plan the verified local API integration.

**Checkpoint note:** This handoff is documentation only; saving it does not signal Saksham's approval and makes no change to deployed firmware or hardware.
