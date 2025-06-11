import {TireMeasurement} from './tire-measurement.model';

export interface AlignmentResult {
  carId: string;
  measurements: TireMeasurement[];
  timestamp: number;
}
