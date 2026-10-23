"use strict";
(function () {
  const core = window.VanarakshakCore;
  const cases = [];
  function test(name, fn) {
    try { fn(); cases.push({ name, ok: true }); }
    catch (error) { cases.push({ name, ok: false, message: error.message }); }
  }
  function assert(condition, message) {
    if (!condition) throw new Error(message || "Assertion failed");
  }
  const evolve = (state, type, payload = {}) => core.reduce(state, { type, ...payload });

  test("Boots in IDLE, with movement stopped", () => {
    const s = core.createState();
    assert(s.mode === "idle" && s.motion === "stopped");
  });
  test("Cannot drive while in IDLE", () => {
    const s = evolve(core.createState(), "DRIVE", { direction: "forward" });
    assert(s.motion === "stopped");
  });
  test("Manual mode allows a recognized direction", () => {
    let s = evolve(core.createState(), "SET_MODE", { mode: "manual" });
    s = evolve(s, "DRIVE", { direction: "left" });
    assert(s.motion === "left");
  });
  test("Rejects unrecognized direction", () => {
    let s = evolve(core.createState(), "SET_MODE", { mode: "manual" });
    s = evolve(s, "DRIVE", { direction: "spin" });
    assert(s.motion === "stopped");
  });
  test("Release/STOP ends motion while retaining MANUAL mode", () => {
    let s = evolve(core.createState(), "SET_MODE", { mode: "manual" });
    s = evolve(s, "DRIVE", { direction: "forward" });
    s = evolve(s, "STOP", { toIdle: false });
    assert(s.motion === "stopped" && s.mode === "manual");
  });
  test("Emergency STOP returns to IDLE", () => {
    let s = evolve(core.createState(), "SET_MODE", { mode: "auto" });
    s = evolve(s, "STOP", { toIdle: true });
    assert(s.mode === "idle" && s.motion === "stopped");
  });
  test("AUTO never authorizes manual direction buttons", () => {
    const s = evolve(core.createState(), "SET_MODE", { mode: "auto" });
    assert(!core.canDrive(s));
  });
  test("Simulated disconnect stops motion and disables driving", () => {
    let s = evolve(core.createState(), "SET_MODE", { mode: "manual" });
    s = evolve(s, "DRIVE", { direction: "forward" });
    s = evolve(s, "SET_SCENARIO", { scenario: "offline" });
    assert(s.connection === "offline" && s.motion === "stopped" && !core.canDrive(s));
  });
  test("Reconnection requires new manual mode selection", () => {
    let s = evolve(core.createState(), "SET_SCENARIO", { scenario: "offline" });
    s = evolve(s, "SET_SCENARIO", { scenario: "normal" });
    assert(s.connection === "simulator" && s.mode === "idle" && s.motion === "stopped");
  });
  test("Sensor fault disables movement", () => {
    let s = evolve(core.createState(), "SET_MODE", { mode: "manual" });
    s = evolve(s, "SET_SCENARIO", { scenario: "missing" });
    assert(!!s.fault && !core.canDrive(s) && s.mode === "idle");
  });
  test("Changing scenario resets mode and motion", () => {
    let s = evolve(core.createState(), "SET_MODE", { mode: "manual" });
    s = evolve(s, "DRIVE", { direction: "right" });
    s = evolve(s, "SET_SCENARIO", { scenario: "obstacle" });
    assert(s.mode === "idle" && s.motion === "stopped");
  });
  test("Simulation frames are visibly and explicitly simulated", () => {
    const data = core.simulateTelemetry("normal", 1);
    assert(data.source === "simulated" && data.mq135Calibrated === false);
  });
  test("Offline and missing fixtures have no readings", () => {
    assert(core.simulateTelemetry("offline", 0) === null);
    assert(core.simulateTelemetry("missing", 0) === null);
  });
  test("Does not pretend unavailable sensor values are zero", () => {
    assert(core.formatValue(null) === "—" && core.formatValue(undefined) === "—");
  });
  test("Speed requested stays in safe mock range", () => {
    let s = evolve(core.createState(), "SET_SPEED", { speed: 99 });
    assert(s.speedPercent === 40);
    s = evolve(s, "SET_SPEED", { speed: -20 });
    assert(s.speedPercent === 10);
  });
  test("Sample age uses display clock, not imaginary hardware", () => {
    let s = evolve(core.createState(), "TELEMETRY", { telemetry: core.simulateTelemetry("normal", 0), now: 1000 });
    assert(core.sampleAgeSeconds(s, 3200) === 2);
  });

  const list = document.getElementById("cases");
  cases.forEach(item => {
    const li = document.createElement("li");
    li.className = item.ok ? "pass" : "fail";
    li.textContent = (item.ok ? "PASS — " : "FAIL — ") + item.name + (item.message ? " (" + item.message + ")" : "");
    list.appendChild(li);
  });
  const passed = cases.filter(item => item.ok).length;
  const result = document.getElementById("result");
  result.textContent = passed + "/" + cases.length + " browser tests passed.";
  result.className = passed === cases.length ? "pass" : "fail";
})();
