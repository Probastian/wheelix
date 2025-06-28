import {Component} from '@angular/core';
import {TyreComponent} from './tyre/tyre.component';
import {SensorMeasurement} from '../../../service/sensor.service';
import {WheelPosition} from '../../../models/tire-measurement.model';

@Component({
  selector: 'app-toe',
  imports: [
    TyreComponent
  ],
  templateUrl: './toe.component.html',
  styleUrl: './toe.component.css'
})
export class ToeComponent {
  frontLeft?: SensorMeasurement;
  frontRight?: SensorMeasurement;
  rearLeft?: SensorMeasurement;
  rearRight?: SensorMeasurement;

  frontToe?: number;
  rearToe?: number;

  onSensorUpdate() {
    if (!!this.frontLeft && !!this.frontRight) {
      this.frontToe = this.calculateToe(this.frontLeft, this.frontRight);
    }
    if (!!this.rearLeft && !!this.rearRight) {
      this.rearToe = this.calculateToe(this.rearLeft, this.rearRight);
    }
  }

  calculateToe(left: SensorMeasurement, right: SensorMeasurement): number | undefined {
    const leftRoll = this.getRollFromMeasurement(left);
    const rightRoll = this.getRollFromMeasurement(right);
    if (leftRoll == null || rightRoll == null) {
      console.warn('Incomplete orientation data for toe calculation.', leftRoll, rightRoll);
      return undefined;
    }
    const toe = this.calculateAngleDelta(leftRoll, rightRoll);
    console.log('Calculated toe (roll-based): ' + toe);
    return toe;
  }

  calculateAngleDelta(angle1: number, angle2: number): number {
    const rawDelta = (angle1 - angle2 + 360) % 360;
    return rawDelta > 180 ? rawDelta - 360 : rawDelta;
  }


  getRollFromMeasurement(meas: SensorMeasurement): number | undefined {
    const { alpha, beta, gamma } = meas.gyroscope;
    if (alpha == null || beta == null || gamma == null) {
      return undefined;
    }
    // Only need β (front/back tilt) and γ (side tilt) here:
    const _beta  = beta  * Math.PI / 180;
    const _gamma = gamma * Math.PI / 180;
    const cb = Math.cos(_beta), sb = Math.sin(_beta);
    const cg = Math.cos(_gamma), sg = Math.sin(_gamma);
    // From the composed rotation matrix R = Rz(α)·Rx(β)·Ry(γ):
    //   r20 = -cb·sg
    //   r22 =  cb·cg
    // Roll (bank) = atan2(–r20, r22)
    const r20 = -cb * sg;
    const r22 =  cb * cg;
    return Math.atan2(-r20, r22) * 180 / Math.PI;
  }

  onMeasurement(wheelPos: WheelPosition, $event: SensorMeasurement | undefined) {
    switch (wheelPos) {
      case 'frontLeft':
        console.log('Set frontLeft:', $event);
        this.frontLeft = $event;
        break;
      case 'frontRight':
        console.log('Set frontRight:', $event);
        this.frontRight = $event;
        break;
      case 'rearLeft':
        console.log('Set rearLeft:', $event);
        this.rearLeft = $event;
        break;
      case 'rearRight':
        console.log('Set rearRight:', $event);
        this.rearRight = $event;
        break;
      default:
        alert('Fuck you. And fuck this wheel -> ' +  wheelPos);
    }
    this.onSensorUpdate();
  }
}
