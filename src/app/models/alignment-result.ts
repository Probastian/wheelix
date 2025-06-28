import {WheelMeasurement} from './tire-measurement.model';

export interface AlignmentResult {
  carId: string;
  measurements: WheelMeasurement[];
  timestamp: number;
}
