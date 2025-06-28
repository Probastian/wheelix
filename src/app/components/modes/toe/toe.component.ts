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
    const leftGamma = left.gyroscope.gamma;
    const rightGamma = right.gyroscope.gamma;
    if (leftGamma == null || rightGamma == null) {
      console.warn('Either leftGamma or rightGamme is undefined.', leftGamma, rightGamma);
      return undefined;
    }
    const toe = leftGamma - rightGamma;
    console.log('Calculated toe: ' + toe);
    return toe;
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
