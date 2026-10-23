'use strict';
(() => {
  const $ = id => document.getElementById(id);
  const transport = new Rover.MockRobotTransport();
  const controller = new Rover.RobotController(transport);
  let active = null, polling = false, refreshing = false;
  const modes = [...document.querySelectorAll('[data-mode]')];
  const moves = [...document.querySelectorAll('[data-direction]')];
  function release() { active = null; void controller.stop().then(render); render(); }
  function render() {
    const sample = controller.sample, sensors = sample?.sensors;
    $('modeBadge').textContent = controller.mode.toUpperCase() + ' · SIMULATED';
    modes.forEach(b => { b.disabled = !controller.ready || (b.dataset.mode === 'auto' && controller.mode !== 'idle'); b.classList.toggle('selected',b.dataset.mode === controller.mode); b.setAttribute('aria-pressed', String(b.dataset.mode === controller.mode)); });
    moves.forEach(b => { b.disabled = !controller.canDrive; b.classList.toggle('active',controller.held === b.dataset.direction); });
    $('movement').textContent = `Simulated motion: ${controller.motion.toUpperCase()} · ${controller.stopConfirmed ? 'STOP acknowledged' : 'command state'}`;
    $('connection').textContent = !controller.online ? 'SIMULATOR OFFLINE' : !controller.fresh ? 'SIMULATOR STALE' : 'SIMULATOR CONNECTED';
    $('freshness').textContent = controller.received === null ? 'No heartbeat' : `Heartbeat ${Math.floor((Date.now()-controller.received)/1000)}s ago · Wi-Fi: not connected to hardware`;
    $('errors').textContent = controller.error || (sample?.fault ? `Simulated fault: ${sample.fault}` : 'Simulator ready. No physical robot connected.');
    [['temp','dht11','temperatureC'],['humidity','dht11','humidityPct'],['mq','mq135','raw'],['distance','ultrasonic','frontDistanceCm']].forEach(([id,key,field]) => {
      const sensor = sensors?.[key]; $(id).textContent = controller.fresh && sensor?.valid && Number.isFinite(sensor[field]) ? sensor[field] : '—';
    });
    document.querySelectorAll('.updated').forEach(n => { const s = sensors?.[n.dataset.sensor || 'dht11']; n.textContent = s && controller.fresh ? `${Math.floor((Date.now()-controller.received + sample.timestampMs-s.sampledAtMs)/1000)}s ago` : 'unavailable / stale'; });
    $('obstacle').textContent = !controller.fresh ? 'Unavailable' : sensors?.infrared?.valid ? `IR left: ${sensors.infrared.leftBlocked ? 'blocked' : 'clear'} · right: ${sensors.infrared.rightBlocked ? 'blocked' : 'clear'} (simulated)` : 'IR unavailable';
    $('flame').textContent = controller.fresh && sensors?.flame?.valid ? (sensors.flame.detected ? 'Possible flame indication (simulated)' : 'No indication (simulated)') : 'Unavailable';
    $('navigation').textContent = controller.mode === 'auto' ? 'Simulated obstacle preview; no validated rover navigation' : 'Stopped / not enabled';
    $('diagnostics').textContent = JSON.stringify(sample,null,2);
  }
  moves.forEach(button => {
    button.addEventListener('pointerdown', event => {
      if (!controller.canDrive || active || event.button !== 0) return;
      event.preventDefault(); button.setPointerCapture(event.pointerId); active = {button,pointerId:event.pointerId};
      void controller.drive(button.dataset.direction,Number($('speed').value)).then(render);
    });
    ['pointerup','pointercancel','lostpointercapture','blur'].forEach(name => button.addEventListener(name,() => { if (active?.button === button) release(); }));
    button.addEventListener('keydown',event => { if (event.key !== 'Enter' || event.repeat || active || !controller.canDrive) return; event.preventDefault(); active={button,key:'Enter'}; void controller.drive(button.dataset.direction,Number($('speed').value)).then(render); });
    button.addEventListener('keyup',event => { if (event.key === 'Enter' && active?.button === button) release(); });
  });
  modes.forEach(button => button.addEventListener('click',async () => {
    if (button.dataset.mode === 'auto') { $('autoGuard').showModal(); return; }
    active = null; const request = controller.setMode(button.dataset.mode); render(); await request; render();
  }));
  $('confirmAuto').addEventListener('click',async () => { $('autoGuard').close(); await controller.setMode('auto'); render(); });
  $('cancelAuto').addEventListener('click',() => $('autoGuard').close());
  ['stop','padStop'].forEach(id => $(id).addEventListener('click',release));
  $('disconnect').addEventListener('click',async () => { await controller.stop(); transport.online=false; controller.online=false; active=null; render(); });
  window.addEventListener('blur',release); window.addEventListener('pagehide',release);
  document.addEventListener('visibilitychange',() => { if(document.hidden) release(); });
  document.addEventListener('keydown',event => { if(event.code === 'Space' || event.key === 'Escape') { event.preventDefault(); release(); } });
  document.addEventListener('pointerup',event => { if(active?.pointerId === event.pointerId) release(); });
  $('speed').addEventListener('input',event => { $('speedDisplay').textContent=event.target.value+'%'; if(active) release(); });
  $('scenario').addEventListener('change',async event => {
    await controller.stop(); active=null; transport.online=event.target.value !== 'offline'; transport.fault=event.target.value === 'fault' ? 'DEMO_SENSOR_FAULT' : null; transport.reject=event.target.value === 'reject'; controller.error=''; render();
  });
  setInterval(async () => {
    await controller.tick();
    if (!polling && $('scenario').value !== 'stale') { polling=true; await controller.poll(); polling=false; }
    render();
  },500);
  setInterval(async () => {
    if (refreshing || !active || !controller.held) return;
    refreshing=true; await controller.drive(active.button.dataset.direction,Number($('speed').value)); refreshing=false; render();
  },150);
  void controller.poll().then(render); render();
})();
