/** Proposed API v1, pending Saksham's review. Device times are uptime milliseconds. */
export type Mode = 'idle' | 'manual' | 'auto';
export type Direction = 'forward' | 'backward' | 'left' | 'right';
export interface Capabilities { apiVersion: 1; modes: Mode[]; autoVerified: boolean; drive: boolean; driveSpeedMaxPercent: number; camera: {supported:boolean; streamUrl?:string|null}; pump:{supported:boolean;reviewed:boolean}; }
export interface Sample {valid:boolean;sampledAtMs?:number;}
export interface Telemetry {apiVersion:1;seq:number;timestampMs:number;mode:Mode;motion:string;fault:string|null;pumpEnabled:boolean;cameraReady:boolean;batteryPct:number|null;sensors:{dht11:Sample & {temperatureC:number|null;humidityPct:number|null};mq135:Sample & {raw:number|null;relativeIndex:number|null;calibrated:boolean};flame:Sample & {detected:boolean|null};infrared:Sample & {leftBlocked:boolean|null;rightBlocked:boolean|null};ultrasonic:Sample & {frontDistanceCm:number|null}};}
export interface Command {requestId:string;seq?:number;mode?:Mode;direction?:Direction;speedPercent?:number;}
export interface Acknowledgment {accepted:boolean;requestId:string;seq?:number;mode?:Mode;motion?:string;error?:string;}
export interface RobotTransport {capabilities:Capabilities;telemetry():Promise<Telemetry>;command(kind:'mode'|'drive'|'stop',payload:Command):Promise<Acknowledgment>;}
