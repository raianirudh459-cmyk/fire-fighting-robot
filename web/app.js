"use strict";
/*
 * Simulator dashboard. Does not perform fetch(), WebSocket(), or other networking.
 * Real commands MUST NOT be added before firmware-side watchdog and API integration tests.
 */
(function () {
  const core = window.VanarakshakCore;
  if (!core) throw new Error("Missing state.js");
  const byId = id => document.getElementById(id);
  const modeButtons = Array.from(document.querySelectorAll("[data-mode]"));
  const driveButtons = Array.from(document.querySelectorAll("[data-direction]"));
  const log = byId("activityLog");
  let state = core.createState();
  let frameIndex = 0;
  let activePointerId = null;
  let activeKeyboardButton = null;

  function appendEvent(message) {
    const item = document.createElement("li");
    const time = document.createElement("time");
    time.textContent = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    item.appendChild(time);
    item.appendChild(document.createTextNode(message));
    log.prepend(item);
    while (log.children.length > 7) log.lastElementChild.remove();
  }

  function dispatch(action) {
    state = core.reduce(state, action);
    render();
  }

  function clearInteraction() {
    activePointerId = null;
    activeKeyboardButton = null;
  }

  function stopMotion(forceIdle, record = true) {
    const wasMoving = state.motion !== "stopped";
    clearInteraction();
    dispatch({ type: "STOP", toIdle: !!forceIdle });
    if (record && (wasMoving || forceIdle)) appendEvent("STOP requested (simulated).");
  }

  function render() {
    const available = state.connection === "simulator" && !state.fault;
    const telemetry = state.telemetry || {};
    const fresh = state.connection === "simulator" && !state.fault && !!state.telemetry;
    const data = key => fresh ? core.formatValue(telemetry[key]) : "—";

    byId("temperature").textContent = data("temperatureC");
    byId("humidity").textContent = data("humidityPct");
    byId("mq135").textContent = data("mq135Raw");
    byId("distance").textContent = data("frontDistanceCm");

    const age = core.sampleAgeSeconds(state, Date.now());
    byId("lastSample").textContent = fresh && age !== null ? age + "s ago · SIMULATED" : "Unavailable";
    byId("freshness").textContent =
      state.connection === "offline" ? "SIMULATED OFFLINE" :
      state.fault ? "SIMULATED SENSOR FAULT" :
      fresh ? "SIMULATED · " + age + "s AGO" : "SIMULATED · AWAITING DATA";

    byId("connectionStatus").textContent = state.connection === "simulator"
      ? "Mock simulator · no robot" : "Disconnected (simulated)";
    byId("flameStatus").textContent = !fresh ? "Unavailable" :
      telemetry.flameDetected ? "Possible flame alert (simulated)" : "No alert (simulated)";
    byId("obstacleStatus").textContent = !fresh ? "Unavailable" :
      telemetry.infraredBlocked ? "Obstacle ahead (simulated)" : "Clear (simulated)";
    byId("modeTag").textContent = state.mode.toUpperCase() + " · MOCK";
    byId("motionStatus").textContent = "Motion: " + state.motion.toUpperCase() + " (simulated)";
    byId("speedValue").textContent = state.speedPercent + "%";

    modeButtons.forEach(button => {
      const selected = state.mode === button.dataset.mode;
      button.disabled = !available;
      button.classList.toggle("selected", selected);
      button.setAttribute("aria-pressed", String(selected));
    });
    driveButtons.forEach(button => {
      button.disabled = !core.canDrive(state);
      button.classList.toggle("active", state.motion === button.dataset.direction);
    });
  }

  function refreshTelemetry() {
    const data = core.simulateTelemetry(state.scenario, frameIndex++);
    if (data) dispatch({ type: "TELEMETRY", telemetry: data, now: Date.now() });
    else render();
  }

  function requestMode(mode) {
    stopMotion(false, false);
    if (!core.canChangeMode(state)) {
      appendEvent("Mode unavailable: simulator is offline or in fault.");
      return;
    }
    dispatch({ type: "SET_MODE", mode });
    appendEvent("Mode set to " + mode.toUpperCase() + " (simulated).");
  }

  function beginDrive(direction) {
    if (!core.canDrive(state)) return false;
    dispatch({ type: "DRIVE", direction });
    appendEvent("Direction held: " + direction + " (simulated).");
    return true;
  }

  modeButtons.forEach(button =>
    button.addEventListener("click", () => requestMode(button.dataset.mode))
  );

  driveButtons.forEach(button => {
    button.addEventListener("pointerdown", event => {
      if (event.pointerType === "mouse" && event.button !== 0) return;
      if (!core.canDrive(state) || activePointerId !== null) return;
      event.preventDefault();
      if (!beginDrive(button.dataset.direction)) return;
      activePointerId = event.pointerId;
      if (button.setPointerCapture) button.setPointerCapture(event.pointerId);
    });
    function endPointer(event) {
      if (activePointerId === event.pointerId) stopMotion(false);
    }
    button.addEventListener("pointerup", endPointer);
    button.addEventListener("pointercancel", endPointer);
    button.addEventListener("lostpointercapture", endPointer);
    button.addEventListener("keydown", event => {
      if (event.repeat || activePointerId !== null || activeKeyboardButton) return;
      if ((event.key === "Enter" || event.key === " ") && beginDrive(button.dataset.direction)) {
        event.preventDefault();
        activeKeyboardButton = button;
      }
    });
    button.addEventListener("keyup", event => {
      if (activeKeyboardButton === button && (event.key === "Enter" || event.key === " ")) {
        event.preventDefault();
        stopMotion(false);
      }
    });
    // No click-to-drive behavior: a click could otherwise leave simulated motion latched.
  });

  byId("emergencyStop").addEventListener("click", () => stopMotion(true));
  byId("padStop").addEventListener("click", () => stopMotion(true));
  byId("speed").addEventListener("input", event =>
    dispatch({ type: "SET_SPEED", speed: event.target.value })
  );

  byId("scenario").addEventListener("change", event => {
    stopMotion(true, false);
    dispatch({ type: "SET_SCENARIO", scenario: event.target.value });
    appendEvent("Scenario changed: " + event.target.selectedOptions[0].textContent + ".");
    refreshTelemetry();
  });

  window.addEventListener("blur", () => stopMotion(false));
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) stopMotion(false);
  });
  document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
      event.preventDefault();
      stopMotion(true);
    }
  });

  appendEvent("Simulator ready. No hardware connections.");
  refreshTelemetry();
  setInterval(refreshTelemetry, 3000);
  setInterval(render, 1000);
})();
