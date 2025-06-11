export type TirePosition = 'frontLeft' | 'frontRight' | 'rearLeft' | 'rearRight';

export interface TireMeasurement {
  position: TirePosition;
  timestamp: number;
  camber: number;
  toe: number;
  caster?: number; // Optional for future use
}
