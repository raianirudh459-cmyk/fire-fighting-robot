# 14 — Proposed V1 Local Robot ↔ Web API Contract

**Status: PROPOSED — requires Saksham's agreement, firmware implementation and actual validation.** This is a collaboration contract, not a claim that these endpoints exist today.

## Transport
Same-origin HTTP over a trusted **local** network is the simplest first version. An optional WebSocket stream may be added later. Do not expose motor commands to the public internet. Saksham defines local authentication and origin protection; no credentials in GitHub code. Browser UI must not presume access to a camera on another hostname. All requests bounded by timeouts.

## Logical endpoints
| Method/path | Intent | Rules |
|---|---|---|
| GET `/api/v1/health` | Verify firmware, API version and status | Never treats network reachability alone as motion-safe |
| GET `/api/v1/capabilities` | Discovery of modes, sensors, camera, pump | Capabilities default false |
| GET `/api/v1/telemetry` | Snapshot of current measured/reported state | Sequence, timestamp, validity, last received age |
| POST `/api/v1/mode` | Request `idle`, `manual`, `auto` | Explicit ack; transition stops motion first |
| POST `/api/v1/drive` | Momentary direction/speed command | Reject if stale, not in manual or unsafe |
| POST `/api/v1/stop` | Highest-priority motors-off request | Idempotent; callable in any mode |
| POST `/api/v1/pump` | Optional reviewed water system | Disabled/unadvertised until approved |
| GET `/api/v1/camera` | Metadata to locate an optional safe local stream | Missing/unsupported initially |

## Example health response (fictional format, not a real hardware sample)
```json
{
  "apiVersion": 1,
  "firmwareVersion": "unverified",
  "robotId": "vanarakshak-rover",
  "status": "idle",
  "uptimeMs": 2000,
  "watchdogTimeoutMs": 500
}
```

## Example capabilities response
```json
{
  "apiVersion": 1,
  "modes": ["idle", "manual"],
  "autoVerified": false,
  "drive": true,
  "driveSpeedMaxPercent": 40,
  "telemetry": ["dht11", "mq135", "flame", "infrared", "ultrasonic"],
  "camera": {"supported": false, "streamUrl": null},
  "pump": {"supported": false, "reviewed": false}
}
```
Never infer AUTO or pump permission from the browser; firmware rejects unsupported actions.

## Example telemetry response — **illustrative fake data**
```json
{
  "apiVersion": 1,
  "seq": 52,
  "timestampMs": 1234500,
  "mode": "idle",
  "motion": "stopped",
  "fault": null,
  "sensors": {
    "dht11": {"temperatureC": 27, "humidityPct": 51, "valid": true, "sampledAtMs": 1234000},
    "mq135": {"raw": 412, "relativeIndex": null, "calibrated": false, "valid": true, "sampledAtMs": 1233800},
    "flame": {"detected": false, "valid": true},
    "infrared": {"leftBlocked": false, "rightBlocked": false, "valid": true},
    "ultrasonic": {"frontDistanceCm": 46, "valid": true}
  },
  "pumpEnabled": false,
  "cameraReady": false,
  "batteryPct": null
}
```

**Measurement guidelines:** `timestampMs` and `sampledAtMs` use **device uptime milliseconds**, not Unix time; browser timestamps samples on receipt and can compute relative ages from these values if counters share the same device clock. Fields may be null when unavailable. Telemetry that is old is labeled STALE. Values here are examples ONLY. Unit labels must be correct: DHT11 °C/%RH; MQ135 raw ADC counts with no fabricated gas ppm/AQI.

## Command messages
```json
{"mode":"manual","requestId":"manual-001"}
```
```json
{"direction":"forward","speedPercent":25,"seq":1001,"requestId":"drive-1001"}
```
```json
{"requestId":"stop-1002"}
```
Response:
```json
{"accepted":true,"requestId":"drive-1001","mode":"manual","motion":"forward","seq":1001}
```
Or explicit error:
```json
{"accepted":false,"requestId":"drive-1001","error":"WRONG_MODE"}
```

## Command safety requirements
- Firmware handles sequence/idempotency and rejects replayed drive commands.
- Manual direction messages must be refreshed while held; lack of fresh commands for a bounded interval forces motor STOP **on the robot**, regardless of browser state.
- Server must not queue delayed movement requests and replay them after reconnect.
- STOP takes priority over every mode/drive command. On a lost STOP acknowledgment, UI must not display a misleading confirmed-stopped state.
- `auto` accepted only after obstacle-safety verification and deliberate enable.
- Changing mode requires the firmware to stop motion and return acknowledged state.
- Pump remains disabled until both server capability and physical safety review are true.
- 400 on malformed input, 401/403 on unauthenticated/unauthorized, 409 on mode conflict, 503 on unsafe/fault; provide a machine-readable error string. Final HTTP mapping is subject to Saksham's implementation.

## Proposed UX timing (adjust after testing)
- DHT11 and MQ135 at source-sensible intervals (roughly every few seconds; don't falsely show 10 Hz readings).
- Navigation and obstacle status may be more frequent if firmware supports it.
- Mark telemetry STALE if no new snapshot in 2 seconds (configurable).
- Drive command refresh target ~150 ms while held; **robot-side timeout target ≤500 ms** to be validated.
- Display command rejection/timeout visibly and request stop.

## Camera capability
Keep `supported:false` until actual board marking and stream verified. If a local stream URL is exposed, use a reviewed allowlist / same-origin proxy; never embed cloud credentials or permit arbitrary URL injection.

## Handshake and integration checklist
- [ ] Saksham agrees to method names/fields/units.
- [ ] Device/board model confirmed.
- [ ] Host-side simulator fixtures validated.
- [ ] Health and telemetry obtained over trusted local network.
- [ ] Motor off on link loss tested on firmware independently.
- [ ] Command ack, fault and STOP behavior tested.
- [ ] Camera URL/protocol verified independently.
- [ ] Auth/origin and LAN restrictions verified.
