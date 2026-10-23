# 11 — Troubleshooting FAQ

| Symptom | Likely cause | Safe next step |
|---|---|---|
| Uno is restarting when nozzle moves | Servo draws too much current from USB/board | Disconnect power; have adult check suitable external regulated servo supply/common ground |
| Green LED never lights | Red/green LED polarity, wiring or code setup issue | Unplug and inspect resistors/anode/cathode against pin map |
| Flame warning stuck | Flame module DO active level, reflections, or bright ambient light | Use Serial Monitor; verify specific module without flame or heat |
| LM35 shows impossible temperature | Incorrect LM35 pinout, analog reference, bad GND | Disconnect power and compare package's datasheet; calibrate against room thermometer |
| Demo toggles repeatedly | Button contacts wired incorrectly or loose | Check D3 -> switch -> GND and debounce; never connect D3 straight to 5V |
| Buzzer silent | Active vs passive buzzer mismatch or reversed polarity | Check passive piezo compatibility, low-current rating and D6/GND |
| Servo does not move | Supply, signal wiring, or mount binding | Unplug; remove heavy load; check external 5 V power and D9 signal |
| Blue LED does not blink | Low-water button held, DEMO OFF, or LED reversed | Observe serial values, restart and press demo once |
| Pump does not run | **Expected**: default firmware intentionally disables pump | Keep safe default; use blue LED. Optional stage requires adult electrical review |
| PlatformIO build error | Missing PlatformIO toolchain or dependency | Check `platformio.ini`, installed packages, and GitHub Actions logs |
| Unable to upload | Incorrect Uno board/serial port or bad USB cable | Select Uno and the appropriate port, follow official Arduino setup instructions |

## Debugging order
1. Confirm code compiles.
2. Confirm Serial Monitor speed 115200.
3. Test with pump physically absent.
4. Test READY and DEMO button modes.
5. Check servo power under load.
6. Calibrate both sensors under normal room conditions.
7. Review all wiring with teacher before adding anything wet.
