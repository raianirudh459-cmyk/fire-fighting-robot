# Dashboard implementation and verification — 2026-10-23

Open `web/index.html` directly, or use Node 18+ with `node web/preview.cjs` and open http://127.0.0.1:4173. No install or build is required. Run `node --test web/tests/controller.test.cjs` for the safety controller suite.

All displayed telemetry and acknowledgments are SIMULATED. There are no fetch, WebSocket, motor, pump or camera network calls. `robot.js` exports a deterministic MockRobotTransport and a disabled HttpRobotTransport integration boundary; `api.d.ts` records proposed v1 types. Production transport is deliberately not implemented before firmware verification.

Manual: select Manual, hold a direction using pointer or Enter, release to STOP. Space/Escape always STOP. Switching direction requires releasing the first control. Changing speed during a hold stops. STOP returns simulator to IDLE. AUTO is an explicitly confirmed indoor-only status preview from IDLE; no real navigation algorithm is claimed. Mock command watchdog stops on the next telemetry snapshot after 500 ms without refresh; this is not proof of any physical watchdog.

Scenario selector demonstrates stale telemetry, offline STOP uncertainty, sensor fault and rejected commands. Return to Normal and deliberately select Manual to resume; reconnection never restores command authority automatically. Disconnect first requests STOP, then turns off the mock connection; select Normal to reconnect.

## Checks actually run
- `node --check web/robot.js`: passed.
- `node --check web/app.js`: passed.
- `node --test web/tests/controller.test.cjs`: 10 passed, 0 failed (including stale, fault, rejection, duplicate telemetry, late mode acknowledgment and watchdog).
- Local preview server started successfully at 127.0.0.1:4173.
- In-app browser preview attempted: ERR_CONNECTION_TIMED_OUT. No screenshot review or browser interaction pass claimed.

## Required remaining browser verification
At widths 320, 390, 768 and 1280 px, confirm no horizontal overflow, readable sensor units, reachable fixed STOP, 44px targets, portrait/landscape, 200% zoom, visible keyboard focus and reduced motion. Verify pointer cancel/capture loss, Enter release, focus loss, hidden page and emergency STOP during AUTO. CSS supports these layouts; visual results are pending because browser preview could not reach the local server. Screen-reader announcement frequency needs human review.

## Handoff limits
Live adapter must implement bounded requests, backoff for telemetry only, API version and capability negotiation, schema validation, session identity across device reboots and stop-priority cancellation. Never retry or queue drive/mode requests automatically. The proposed contract needs server ordering guarantees so a delayed mode/drive cannot execute after STOP; ignoring late browser acknowledgments alone cannot stop a device. Verify watchdog, fault, ranging/IR loss, physical switch, authentication/origin checks and speed bounds on firmware before enabling live control.

Camera remains NOT CONFIGURED. Future integration must use reviewed LAN allowlists or a same-origin gateway, reject arbitrary external URLs and credentials, and handle HTTPS mixed-content, CORS and browser local-network permissions. Do not add a streaming URL until board/protocol verified. Future camera state progression: NOT CONFIGURED → CONNECTING → LIVE → RECONNECTING/OFFLINE; none of these live states is simulated today.

User: review mobile experience and API types with Saksham. Saksham: confirm controller, camera board, firmware examples, monotonic sequencing/session reset, bounded watchdog and stop priority. Adult/teacher: approve protected commercial power, physical switch, movement area and any separately reviewed water setup. Pump remains unsupported and OFF. No firmware-owned source was changed; no hardware/network integration tests were performed.
