# 15 — Two-person collaboration and GitHub workflow

## Responsibilities
| Stream | You — web developer | Saksham — firmware developer |
|---|---|---|
| Architecture | Browser UI / transport clients | Rover controller(s), sensors and motors |
| Driving | Hold-to-drive UI, mode requests, stop UX | Motor execution, safety watchdog, speed caps |
| Autonomy | Status, opt-in, alerts | Navigation, obstacles and on-robot stop |
| Telemetry | Cards, units, timestamps, stale/error states | DHT11/MQ135/IR/ultrasonic/flame acquisition |
| Camera | Safe, responsive viewer; unavailable state | Identify board, publish tested stream metadata |
| Pump | Disabled by default; capability-gated UI | Adult-reviewed relay + pump integration |
| Testing | 320/390/768/1280 responsive, mock/real API testing | Board-level firmware logs, hardware/stop tests |
| Docs | docs/13, 14, 17 and UX screenshots | firmware docs and final electrical schematic |

## Suggested branches
- `main`: reviewed stable project; don't auto-merge.
- `feature/vanarakshak-uno-foundation`: working shared baseline being updated to V2.
- `feature/web-dashboard` or `codex/web-dashboard-v2`: **your** UI branch.
- `feature/rover-firmware-saksham`: **Saksham**'s firmware branch.
- Merge both through peer-reviewed pull requests after interface contract is stable.

## API-first protocol collaboration
1. Both read docs/14 and agree on field names, valid units and state values.
2. Saksham checks feasible ESP8266/local network transport and commits example JSON payloads.
3. You create a mock `RobotTransport` that uses these fixture payloads.
4. Jointly inspect every error/fault/STOP case with the motors disengaged.
5. Only then add real local-network transport.
6. Create GitHub issues for missing endpoints, mismatched fields and camera compatibility.

## Definition of handoff
**Saksham -> You:** working LAN URL, supported endpoints, response examples, firmware version, sensor validity/calibration state, camera URL/protocol if tested, authentication flow that does NOT publish secrets, measured stop-watchdog behavior.  
**You -> Saksham:** validated dashboard screen, control event sequence, desired API examples, reproducible client errors, responsive screenshot evidence, and accepted timeout behavior.

## Code reviews and commits
- Keep PR scopes small and meaningful; include screenshots for visual changes.
- Never overwrite the other person's unrelated code.
- Include tests and exact results with commits.
- Keep passwords, access tokens, credentials, and sensitive network details out of committed files.
- Schedule live-demo integration only after adult reviews power and movement hazards.
