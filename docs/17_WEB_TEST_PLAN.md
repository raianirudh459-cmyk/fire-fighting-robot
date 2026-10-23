# 17 — Frontend implementation and test specification

## Primary user journeys
1. Open `web/index.html` on a phone; identify that it is a simulation.
2. Read environmental cards: DHT11 temperature/humidity and MQ135 raw sensor response.
3. Switch to MANUAL simulator; hold direction, release to issue mock STOP.
4. Move speed slider and see selected percentage without implying actual measured speed.
5. Switch to AUTO simulator; see obstacle-avoidance storyline labeled mock.
6. Press prominent STOP and see idle/stopped state.
7. Observe a camera-unavailable placeholder instead of a fabricated live feed.
8. Switch away from page while holding motion -> mock STOP, without reactivating automatically.

## Accessibility
- [ ] Every button has discernible text/aria-label.
- [ ] All controls are keyboard reachable and visible focus ring appears.
- [ ] Disabled state communicates why the action is unavailable.
- [ ] Live status updates have polite, low-noise announcements.
- [ ] STOP remains visible and reachable at mobile widths.
- [ ] Touch gestures do not accidentally scroll while holding a D-pad control.
- [ ] Content still fits at 200% browser zoom.
- [ ] Reduced motion preference suppresses decorative animations.

## Responsive testing
| Width | Manual check |
|---:|---|
| 320px | Single column, no horizontal overflow, D-pad tap targets usable |
| 390px | Dashboard cards and control buttons readable in portrait |
| 768px | Layout spreads without excess whitespace and preserves controls |
| 1280px | Main cards, camera and controls fit a desktop command layout |

## Correctness and command safety test checklist
- [ ] No real HTTP request or motor command from starter mock mode.
- [ ] Clearly visible simulated badge before anyone can use controls.
- [ ] Manual mode required before any directional control activates.
- [ ] Pointerup and pointercancel each stop the direction.
- [ ] Blur and visibilitychange stop simulated motion.
- [ ] STOP is accessible while simulated AUTO is active.
- [ ] Mode change first clears motion.
- [ ] Camera placeholder is still readable offline.
- [ ] Missing telemetry represented as unavailable, not zero.
- [ ] After future live integration: stale state disables control and prevents auto-restart on reconnect.
- [ ] After future live integration: rejected commands do not optimistically change acknowledged mode.

## Integration fixtures
Use the proposed JSON fixtures in docs/14, changing only when Saksham and you agree. Validate both happy path and invalid/null/missing-value cases. Collect actual screenshots and logs from tests; do not fabricate results.

## Security checks before any live mode
- [ ] Firmware authenticated/authorized local control on trusted LAN.
- [ ] API rejects unsupported directions, excessive speed and inappropriate modes.
- [ ] Browser does not contain secrets, passwords or tokens in source.
- [ ] Camera stream is verified and kept private/local.
- [ ] Connection loss triggers an on-device motor-stop watchdog.
- [ ] Real relay/pump default remains OFF.

## V2 software verification record
Controller tests and exact verification limits are in [docs/18](18_WEB_IMPLEMENTATION.md). Run `node --test web/tests/controller.test.cjs`; browser layout and hardware acceptance items above remain unchecked until observed. Use the simulator scenario selector for stale/offline/fault/rejection journeys.
