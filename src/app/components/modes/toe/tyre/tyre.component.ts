import {Component, EventEmitter, Output} from '@angular/core';
import {SensorMeasurement, SensorsService} from '../../../../service/sensor.service';
import {ConfirmationService} from 'primeng/api';
import {ConfirmDialogModule} from 'primeng/confirmdialog';

@Component({
  selector: 'app-toe-tyre',
  providers: [ConfirmationService, ConfirmDialogModule],
  templateUrl: './tyre.component.html',
  styleUrl: './tyre.component.css'
})
export class TyreComponent {
  @Output()
  measurement: EventEmitter<SensorMeasurement | undefined> = new EventEmitter<SensorMeasurement | undefined>();

  constructor(
    readonly sensorsService: SensorsService,
    readonly confirmationService: ConfirmationService,
  ) { }

  onClick() {
    if (this.sensorsService.sensorStatus === 'disabled' || true) {
      console.warn("Enable sensor to perform measurements.")
      this.confirmationService.confirm({
        header: 'Enable sensors?',
        message: 'Sensors needs to be running to take measurements. Enable sensors now?',
        icon: 'pi pi-bolt',
        accept: () => this.sensorsService.startSensors()
      });

      if (this.sensorsService.sensorStatus === 'disabled') {
        return;
      }
    } else if (this.sensorsService.sensorStatus === 'notResponding') {
      console.warn("Sensors not responding, not taking measurements.");
      return;
    }

    this.measurement.emit(this.sensorsService.getLastSensorMeasurement());
  }
}
