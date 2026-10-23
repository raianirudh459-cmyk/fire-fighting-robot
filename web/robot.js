/* Dependency-free browser + Node safety core. Live networking deliberately unavailable. */
(function (root) {
  'use strict';
  const directions = ['forward', 'backward', 'left', 'right'];
  class MockRobotTransport {
    constructor() { this.mode = 'idle'; this.motion = 'stopped'; this.seq = 0; this.commandSeq = 0; this.online = true; this.fault = null; this.reject = false; this.lastDrive = 0; }
    capabilities = { apiVersion: 1, modes: ['idle','manual','auto'], autoVerified: true, drive: true, driveSpeedMaxPercent: 40, camera: {supported:false}, pump: {supported:false,reviewed:false} };
    async command(kind, payload) {
      if (!this.online) throw Error('Simulator offline');
      if (kind !== 'stop' && this.reject) throw Error('Simulated command rejection');
      if (kind === 'stop') { this.mode = 'idle'; this.motion = 'stopped'; }
      if (kind === 'mode') { this.mode = payload.mode; this.motion = 'stopped'; }
      if (kind === 'drive') {
        if (this.mode !== 'manual' || this.fault || payload.seq <= this.commandSeq || !directions.includes(payload.direction) || payload.speedPercent > 40) throw Error('Unsafe drive rejected');
        this.commandSeq = payload.seq; this.motion = payload.direction; this.lastDrive = Date.now();
      }
      return {accepted:true, requestId:payload.requestId, seq:payload.seq, mode:this.mode, motion:this.motion};
    }
    async telemetry() {
      if (!this.online) throw Error('Simulator offline');
      if (this.fault || Date.now() - this.lastDrive > 500) this.motion = 'stopped';
      const seq = ++this.seq, timestampMs = seq * 500;
      const i = Math.floor(seq / 6) % 5;
      return {apiVersion:1, seq, timestampMs, mode:this.mode, motion:this.motion, fault:this.fault, pumpEnabled:false, cameraReady:false, batteryPct:null,
        sensors:{dht11:{temperatureC:[27,27,28,27,26][i], humidityPct:[52,51,52,53,53][i],valid:true,sampledAtMs:timestampMs - timestampMs % 3000},
        mq135:{raw:[411,418,409,422,415][i],relativeIndex:null,calibrated:false,valid:true,sampledAtMs:timestampMs - timestampMs % 3000},
        flame:{detected:false,valid:true},infrared:{leftBlocked:this.mode==='auto' && i===2,rightBlocked:false,valid:true},ultrasonic:{frontDistanceCm:[48,46,20,47,50][i],valid:true}}};
    }
  }
  class HttpRobotTransport {
    constructor() { throw Error('Live adapter disabled: requires verified firmware, LAN/origin protection and watchdog acceptance. See docs/14_API_CONTRACT.md.'); }
  }
  class RobotController {
    constructor(transport, now = () => Date.now()) {
      this.transport = transport; this.now = now; this.received = null; this.sample = null; this.mode = 'idle'; this.motion = 'unknown'; this.busy = false; this.error = ''; this.held = null; this.epoch = 0; this.seq = 0; this.lastSeq = -1; this.online = false; this.stopConfirmed = false;
    }
    get fresh() { return this.online && this.received !== null && this.now() - this.received < 2000; }
    get ready() { return this.fresh && !this.sample?.fault && !this.busy; }
    get canDrive() { return this.ready && this.mode === 'manual' && this.transport.capabilities?.drive === true; }
    accept(sample) {
      if (sample?.apiVersion !== 1 || !Number.isSafeInteger(sample.seq) || sample.seq <= this.lastSeq || !Number.isFinite(sample.timestampMs) || !['idle','manual','auto'].includes(sample.mode) || !sample.sensors) throw Error('Invalid, incompatible or duplicate telemetry');
      this.lastSeq = sample.seq; this.sample = sample; this.received = this.now(); this.online = true;
      // Reconnection never grants command authority; only a mode acknowledgment does.
      if (sample.fault) { this.held = null; this.mode = 'idle'; }
      this.motion = sample.motion;
    }
    async send(kind, extra = {}) {
      const seq = ++this.seq, requestId = `${kind}-${seq}`;
      const ack = await this.transport.command(kind, {...extra, seq, requestId});
      if (ack?.accepted !== true || ack.requestId !== requestId || (kind === 'drive' && ack.seq !== seq)) throw Error(ack?.error || 'Invalid command acknowledgment');
      return ack;
    }
    async stop() {
      ++this.epoch; this.held = null; this.mode = 'idle'; this.busy = false; this.stopConfirmed = false; this.motion = 'unknown';
      try { const ack = await this.send('stop'); if (ack.motion !== 'stopped' || ack.mode !== 'idle') throw Error('STOP not confirmed'); this.motion = 'stopped'; this.stopConfirmed = true; }
      catch (error) { this.error = `Unable to confirm STOP: ${error.message}`; }
    }
    async setMode(mode) {
      if (!this.ready || !this.transport.capabilities?.modes.includes(mode)) return;
      if (mode === 'auto' && (this.mode !== 'idle' || this.transport.capabilities.autoVerified !== true)) return;
      await this.stop(); if (!this.stopConfirmed || !this.fresh || this.sample?.fault) return;
      const epoch = this.epoch; this.busy = true; this.error = '';
      try { const ack = await this.send('mode',{mode}); if (epoch !== this.epoch) return; if (ack.mode !== mode || ack.motion !== 'stopped') throw Error('Mode acknowledgment mismatch'); this.mode = ack.mode; }
      catch(error) { this.error = error.message; await this.stop(); }
      finally { if (epoch === this.epoch) this.busy = false; }
    }
    async drive(direction, speedPercent) {
      if (!this.canDrive || !directions.includes(direction) || !Number.isFinite(speedPercent) || speedPercent < 0 || speedPercent > this.transport.capabilities.driveSpeedMaxPercent) return;
      const epoch = this.epoch; this.held = direction;
      try { const ack = await this.send('drive',{direction,speedPercent}); if (epoch === this.epoch && this.held === direction) this.motion = ack.motion; }
      catch(error) { this.error = error.message; await this.stop(); }
    }
    async poll() {
      try { this.accept(await this.transport.telemetry()); if (this.sample.fault) await this.stop(); }
      catch(error) { this.online = false; this.error = error.message; await this.stop(); }
    }
    async tick() { if (!this.fresh && (this.held || this.mode !== 'idle')) await this.stop(); }
  }
  const exports = {MockRobotTransport,HttpRobotTransport,RobotController};
  if (typeof module !== 'undefined') module.exports = exports; else root.Rover = exports;
})(globalThis);
