"use strict";
// SIMULATOR ONLY. No networking or real motor/pump signals in this file.
// The real contract is documented in docs/14_API_CONTRACT.md and requires Saksham's firmware.
(() => {
  const $ = (id) => document.getElementById(id);
  const modeButtons = Array.from(document.querySelectorAll("[data-mode]"));
  const moveButtons = Array.from(document.querySelectorAll("[data-direction]"));
  let mode = "idle";
  let motion = "stopped";
  let active = null;
  let tick = 0;

  function render() {
    $("modeBadge").textContent = mode.toUpperCase() + " · SIMULATED";
    modeButtons.forEach(button => {
      const selected = button.dataset.mode === mode;
      button.classList.toggle("selected", selected);
      button.setAttribute("aria-pressed", String(selected));
    });
    moveButtons.forEach(button => {
      button.disabled = mode !== "manual";
      button.classList.toggle("active", button.dataset.direction === motion);
    });
    $("movement").textContent = "Motors: " + motion.toUpperCase() + " (simulated)";
    $("obstacle").textContent = mode === "auto" ? "Avoiding mock obstacles" : "Clear (simulated)";
  }

  function stop() {
    motion = "stopped";
    active = null;
    render();
  }

  function setMode(next) {
    stop();
    mode = next;
    if (next === "auto") motion = "simulated auto navigation";
    render();
  }

  // A press is active only while pointer stays down. This sends NO actual network commands.
  moveButtons.forEach(button => {
    button.addEventListener("pointerdown", event => {
      if (mode !== "manual" || button.disabled) return;
      event.preventDefault();
      stop();
      active = {pointerId: event.pointerId, direction: button.dataset.direction};
      button.setPointerCapture(event.pointerId);
      motion = active.direction;
      render();
    });
    button.addEventListener("pointerup", stop);
    button.addEventListener("pointercancel", stop);
    button.addEventListener("lostpointercapture", stop);
    // Keyboard activation is a separate, explicit press/release interaction.
    button.addEventListener("keydown", event => {
      if ((event.key === "Enter" || event.key === " ") && !event.repeat && mode === "manual") {
        event.preventDefault();
        motion = button.dataset.direction;
        render();
      }
    });
    button.addEventListener("keyup", event => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        stop();
      }
    });
    // Do not use click-to-drive: a click is not equivalent to a hold.
  });

  modeButtons.forEach(button => button.addEventListener("click", () => setMode(button.dataset.mode)));
  $("stop").addEventListener("click", () => setMode("idle"));
  $("padStop").addEventListener("click", () => setMode("idle"));
  document.addEventListener("keydown", event => {
    if (event.code === "Space" && !event.repeat && !["INPUT","BUTTON"].includes(document.activeElement.tagName)) {
      event.preventDefault(); setMode("idle");
    }
  });
  window.addEventListener("blur", stop);
  document.addEventListener("visibilitychange", () => { if (document.hidden) stop(); });
  document.addEventListener("pointerup", () => { if (active) stop(); });
  $("speed").addEventListener("input", event => { $("speedDisplay").textContent = event.target.value + "%"; });

  // Deterministic test values; they are never sensor measurements.
  const mock = [
    {t:27,h:52,mq:411,d:48},
    {t:27,h:51,mq:418,d:46},
    {t:28,h:52,mq:409,d:45},
    {t:27,h:53,mq:422,d:47},
    {t:26,h:53,mq:415,d:50}
  ];
  function renderMockReadings() {
    const sample = mock[tick++ % mock.length];
    $("temp").textContent = sample.t;
    $("humidity").textContent = sample.h;
    $("mq").textContent = sample.mq;
    $("distance").textContent = sample.d;
    document.querySelectorAll(".updated").forEach(node => node.textContent = "just now");
  }
  renderMockReadings();
  setInterval(renderMockReadings, 3000);
  render();
})();
