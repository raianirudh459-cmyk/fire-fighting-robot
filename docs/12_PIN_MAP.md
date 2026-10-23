# 12 — Authoritative Arduino Uno R3 pin map

Source of truth is `include/config.h`. Update this document, wiring guide, and code together if a pin changes.

| UNO signal | Purpose | Polarity/configuration |
|---|---|---|
| A0 | LM35 analog voltage | 0–1023 ADC converted to Celsius |
| D2 | IR flame sensor DO | INPUT, typical LOW = flame warning (verify module) |
| D3 | DEMO switch | INPUT_PULLUP; pressed = GND; toggles demo |
| D4 | LOW-WATER simulator switch | INPUT_PULLUP; pressed = GND; inhibits spray |
| D5 | Optional MOSFET gate | OUTPUT; default LOW; code disables pump |
| D6 | Piezo buzzer | OUTPUT `tone()` |
| D7 | Red LED | OUTPUT via 220 Ω, HIGH = on |
| D8 | Green LED | OUTPUT via 220 Ω, HIGH = on |
| D9 | SG90 signal | Servo library; external suitable 5 V power |
| D10 | Blue SPRAY LED | OUTPUT via 220 Ω, HIGH = active phase |
| 5V/GND | Sensors and logic | Verify module voltage; shared ground |
| External 5V/GND | Servo, optional pump | Supply rated for connected load, shared ground |

**Do not add an ESP8266 or Wi-Fi unless a later milestone specifically requests it.** Existing repository ESP8266 files are unrelated and should not be deleted or assumed to be functioning.
