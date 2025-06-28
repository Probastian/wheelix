export type WheelPosition = 'frontLeft' | 'frontRight' | 'rearLeft' | 'rearRight';

export interface WheelMeasurement {
  position: WheelPosition;
  timestamp: number;
  camber: number;
  toe: number;
  caster?: number; // Optional for future use
}
