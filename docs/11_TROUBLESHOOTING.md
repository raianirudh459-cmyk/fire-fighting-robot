# 11 — Web + robot troubleshooting

| Symptom | Interpretation | Response |
|---|---|---|
| Dashboard shows SIMULATED | Correct: preview mode uses fake telemetry | Do not claim live data; wait for signed firmware contract |
| Dashboard shows OFFLINE | No verified network session or stale telemetry | Keep drive and mode commands disabled, inspect local Wi-Fi endpoint with Saksham |
| Temperature or humidity shows dash | DHT11 value absent/invalid | Show unavailable; Saksham checks sensor and reporting |
| MQ135 value seems strange | Warm-up, drift, cross-sensitivity, ADC/voltage issue | Show raw reading and calibration state; don't claim smoke ppm |
| Video is blank | Camera unsupported or wrong module/URL, mixed-content/CORS issues | Show camera placeholder, confirm actual module and LAN transport |
| Motor continues after release | Critical firmware safety failure | Use physical power OFF, stop driving tests; Saksham fixes on-device watchdog |
| AUTO cannot be enabled | Correct if firmware lacks obstacle safety verification | Do not override it in browser |
| Commands time out | Packet lost or firmware didn't acknowledge | Show error, request STOP, never replay motion automatically |
| Red/green statuses disagree | UI may be showing desired rather than acknowledged state | Drive UI from acknowledged telemetry/response |
| Battery status missing | No battery measurement integration | Display N/A, never invent percentage |
| Pump button disabled | Correct initial safe state | Keep disabled; use simulated demonstration |
| Current legacy Uno CI passes | It tests **old stationary sketch**, not the rover | Implement new verified firmware CI separately |

## Debugging handoff
You: capture timestamp, dashboard mode, endpoint/response status and sanitized console error (no Wi-Fi credentials).  
Saksham: capture robot logs, command sequence, actual controller behavior and sensor validity.  
Both: compare an agreed payload and log a reproducible issue; never continue moving a rover if stop behavior is uncertain.
