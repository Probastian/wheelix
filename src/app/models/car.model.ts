import {MeasurementTargetValues} from './measurement-target-values.model';
import {TireMeasurement} from './tire-measurement.model';

export interface Car {
  id: string;
  name: string;
  frontLeft: MeasurementTargetValues;
  frontRight: MeasurementTargetValues;
  rearLeft: MeasurementTargetValues;
  rearRight: MeasurementTargetValues;
  measurements: TireMeasurement[]; // We'll type this properly when we implement measurements
}
