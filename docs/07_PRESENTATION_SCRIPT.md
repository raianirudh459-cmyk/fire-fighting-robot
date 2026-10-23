# 07 — Five-minute team presentation (you + Saksham)

**Project:** VANARAKSHAK 2.0 — The Forest Fire Fighter Rover  
**Slogan:** Detect Early. Respond Smart. Protect Forests.  
**Rule:** Demonstrate indoors without flames, smoke or heating.

## 0:00–0:40 — Opening (you)
"Good morning. We're presenting VANARAKSHAK, a prototype forest-protection rover. Forest fires can affect wildlife and biodiversity. Our school model shows how a mobile robot, environmental sensors, and a remote dashboard could illustrate early observation. This is a classroom demonstration, not an actual firefighting robot."

## 0:40–1:35 — Hardware (Saksham)
"Our rover uses four DC motors and two L298N drivers. Infrared and ultrasonic sensors represent obstacle awareness, flame modules represent possible fire warnings, and DHT11 and MQ135 provide environmental readings. Wi-Fi connects the rover to the dashboard. We use recycled materials to show the forest environment."

## 1:35–2:35 — Mobile dashboard (you)
"Here is the interface I designed. It works on a phone as well as a laptop. It can show temperature in Celsius, humidity as a percentage, and the MQ135 gas sensor's relative response. It also shows connection status, warnings, driving mode, and a camera view when our camera hardware supports it. We clearly label simulated data when the physical robot isn't connected."

## 2:35–3:30 — Modes (Saksham; you operate the UI)
"MANUAL means a person holds the direction buttons to drive the model in a controlled indoor arena. Releasing the button stops motion. AUTO means the robot tries to navigate around harmless obstacles using its sensors; we keep a STOP button ready. We do not run autonomous mode unattended."

## 3:30–4:20 — Innovation + water (both)
"Our innovations are a mobile dashboard, two driving modes, and environmental information in one place. We also designed an optional pump demonstration. Its water-related controls remain disabled until safe separation from the electronics has been checked, so we can explain it with a visual indicator instead."

## 4:20–5:00 — Environmental message (both)
"Reusing cardboard and other materials reduces waste. Early observation and responsible technology are important, but real wildfire emergencies must be handled by trained teams. VANARAKSHAK shows our ideas for protecting the forest. Our slogan is: Detect Early. Respond Smart. Protect Forests. Thank you."

## Questions judges may ask
- **Why a phone dashboard?** Portable, understandable remote controls and live presentation of readings.
- **Why autonomous mode?** It demonstrates obstacle-aware navigation, not safe movement through real forests.
- **What does the MQ135 measure?** A broad gas/air-quality response. Without rigorous calibration it doesn't output a trustworthy smoke concentration.
- **How do you prevent loss-of-signal driving?** Firmware command timeout and hardware stop; the browser also requests STOP.
- **Is this a real wildfire response system?** No. It is a supervised educational prototype.
