#pragma once
// Pure portable logic: compiled both by Arduino and the host-side test program.
namespace forest {
enum class AlertLevel { READY, CAUTION, CONFIRMED };

inline AlertLevel evaluate(bool flameDetected, float temperatureC,
                           float thresholdC, bool confirmedRealFire,
                           bool demoEnabled) {
    if (demoEnabled || confirmedRealFire) return AlertLevel::CONFIRMED;
    if (flameDetected || temperatureC >= thresholdC) return AlertLevel::CAUTION;
    return AlertLevel::READY;
}

inline bool maySpray(AlertLevel alert, bool lowWater) {
    return alert == AlertLevel::CONFIRMED && !lowWater;
}
} // namespace forest
