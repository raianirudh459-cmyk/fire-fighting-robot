# 06 — Safe system test plan (no fire, no smoke)

## Before any hardware testing
- [ ] Exact module models and controller board checked by Saksham.
- [ ] Adult verifies protected preassembled battery power and main switch; never assemble or charge loose cells as a school activity.
- [ ] All high-current motors/pump verified separately with motors off ground and suitably controlled test space.
- [ ] Water system disconnected; relay/pump disabled.
- [ ] Rover secured inside an indoor clear arena, wheels away from hands and hair.
- [ ] Physical main OFF switch accessible.
- [ ] No flame, smoke, heater, candle, burner or simulated chemical smoke source.

## UI acceptance (your role)
| Test | Action | Expected |
|---|---|---|
| W01 | Open page on 320px mobile | No horizontal scroll; all buttons usable |
| W02 | Open local simulated dashboard | SIMULATED label visible; no claim of real data |
| W03 | Change simulator mode to MANUAL | UI shows explicit mode and control state |
| W04 | Hold direction then release | Mock transport receives stop immediately |
| W05 | Drag finger off a pressed button | Motion request ends / stop issued |
| W06 | Hide tab or switch apps while controlling | Stop issued, control returns to neutral |
| W07 | Select AUTO | Explicit badge and indoor-only caveat |
| W08 | Simulate lost connection | Controls disabled, clear OFFLINE/stale state |
| W09 | Camera unavailable | Useful placeholder; no broken video |
| W10 | MQ135 not calibrated | Labels raw/relative, not fabricated ppm |
| W11 | Values unavailable | Show "—" and sample age, not zero |
| W12 | STOP button | High-visibility, promptly clears requested motion |

## Joint contract tests
| Test | Setup | Expected |
|---|---|---|
| I01 | Firmware heartbeat expires | On-device motor driver stops independently of browser |
| I02 | Browser switches MANUAL -> AUTO | Robot stops, acknowledges safe change; no accidental drive |
| I03 | Invalid distance sensor | AUTO refuses or stops and reports fault |
| I04 | Duplicate/delayed command | Sequence/idempotency prevents surprise movement |
| I05 | Phone disconnects during MANUAL | Motors stop after watchdog, even if STOP packet lost |
| I06 | Telemetry temporarily disappears | UI shows stale data and blocks drive |
| I07 | Pump unsupported or unapproved | Pump control hidden/disabled; relay OFF |
| I08 | Camera unsupported | Camera card remains unavailable without crashing |
| I09 | Physical master switch OFF | Motors and optional pump stop regardless of UI |
| I10 | Restart firmware | Starts IDLE and pump OFF, no resumed movement |

## Evidence ledger
Record test date, commit, tester, environment, result, actual telemetry/ack trace, and pending issues. Do not mark hardware tests complete unless run on real confirmed hardware.
