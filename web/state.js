"use strict";
/*
 * VANARAKSHAK simulator state — pure logic, no motors, network, batteries or pumps.
 * Browser classic-script export: no npm, bundler, Node, or module server required.
 */
(function (root) {
  const MODES = Object.freeze(["idle", "manual", "auto"]);
  const DIRECTIONS = Object.freeze(["forward", "backward", "left", "right"]);
  const SCENARIOS = Object.freeze(["normal", "obstacle", "flame", "missing", "offline"]);
  const FRAMES = Object.freeze([
    { temperatureC: 27, humidityPct: 52, mq135Raw: 411, frontDistanceCm: 48 },
    { temperatureC: 27, humidityPct: 51, mq135Raw: 418, frontDistanceCm: 46 },
    { temperatureC: 28, humidityPct: 52, mq135Raw: 409, frontDistanceCm: 45 },
    { temperatureC: 27, humidityPct: 53, mq135Raw: 422, frontDistanceCm: 47 },
    { temperatureC: 26, humidityPct: 53, mq135Raw: 415, frontDistanceCm: 50 }
  ]);

  function createState() {
    return {
      connection: "simulator",
      scenario: "normal",
      mode: "idle",
      motion: "stopped",
      speedPercent: 25,
      fault: null,
      telemetry: null,
      sampleReceivedAt: null
    };
  }

  function canDrive(state) {
    return state.connection === "simulator" &&
      state.mode === "manual" && !state.fault &&
      state.scenario !== "missing";
  }

  function canChangeMode(state) {
    return state.connection === "simulator" && !state.fault;
  }

  function reduce(state, action) {
    if (!state || !action || typeof action.type !== "string") return state;
    switch (action.type) {
      case "SET_MODE": {
        if (!canChangeMode(state) || !MODES.includes(action.mode)) return state;
        return {
          ...state, mode: action.mode,
          motion: action.mode === "auto" ? "simulated autonomous demo" : "stopped"
        };
      }
      case "DRIVE": {
        if (!canDrive(state) || !DIRECTIONS.includes(action.direction)) return state;
        return { ...state, motion: action.direction };
      }
      case "STOP":
        return { ...state, motion: "stopped", mode: action.toIdle ? "idle" : state.mode };
      case "SET_SPEED": {
        const speed = Number(action.speed);
        if (!Number.isFinite(speed)) return state;
        return { ...state, speedPercent: Math.min(40, Math.max(10, Math.round(speed / 5) * 5)) };
      }
      case "SET_SCENARIO": {
        if (!SCENARIOS.includes(action.scenario)) return state;
        const offline = action.scenario === "offline";
        const missing = action.scenario === "missing";
        return {
          ...state, scenario: action.scenario, connection: offline ? "offline" : "simulator",
          mode: "idle", motion: "stopped",
          fault: missing ? "Sample unavailable (simulation)" : null,
          telemetry: null, sampleReceivedAt: null
        };
      }
      case "TELEMETRY":
        if (state.connection !== "simulator" || !action.telemetry) return state;
        return {
          ...state, telemetry: action.telemetry,
          sampleReceivedAt: Number.isFinite(action.now) ? action.now : null
        };
      default: return state;
    }
  }

  function simulateTelemetry(scenario, index) {
    if (scenario === "missing" || scenario === "offline") return null;
    const frame = FRAMES[Math.abs(Math.trunc(index || 0)) % FRAMES.length];
    return {
      ...frame,
      frontDistanceCm: scenario === "obstacle" ? 12 : frame.frontDistanceCm,
      infraredBlocked: scenario === "obstacle",
      flameDetected: scenario === "flame",
      // MQ135 raw ADC counts are not gas ppm, an AQI, or certified smoke detection.
      mq135Calibrated: false,
      source: "simulated"
    };
  }

  function formatValue(value) {
    return typeof value === "number" && Number.isFinite(value) ? String(value) : "—";
  }

  function sampleAgeSeconds(state, now) {
    if (!Number.isFinite(state.sampleReceivedAt) || !Number.isFinite(now)) return null;
    return Math.max(0, Math.floor((now - state.sampleReceivedAt) / 1000));
  }

  root.VanarakshakCore = Object.freeze({
    createState, canDrive, canChangeMode, reduce, simulateTelemetry, formatValue,
    sampleAgeSeconds, MODES, DIRECTIONS, SCENARIOS
  });
})(typeof window !== "undefined" ? window : globalThis);
