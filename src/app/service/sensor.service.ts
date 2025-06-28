import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

export type SensorStatus = 'enabled' | 'disabled' | 'notResponding';

export interface AccelerometerData {
  x: number | null;
  y: number | null;
  z: number | null;
  gravityX: number | null;
  gravityY: number | null;
  gravityZ: number | null;
  interval: number | null;
}

export interface GyroscopeData {
  alpha: number | null;
  beta: number | null;
  gamma: number | null;
}

export interface SensorMeasurement {
  accelerometer: AccelerometerData;
  gyroscope: GyroscopeData;
}

/**
 * <b>Important:</b> Sensors require the use of HTTPS!
 */
@Injectable({
  providedIn: 'root'
})
export class SensorsService {
  private isRunning = false;

  private lastUpdateTimestamp: number | undefined;

  get sensorStatus(): SensorStatus {
    if (!this.isRunning) {
      return 'disabled';
    }
    if (new Date().getTime() > this.lastUpdateTimestamp! + 500) {
      return 'notResponding';
    }
    var lastSensorMeasurement = this.getLastSensorMeasurement();
    if (!lastSensorMeasurement || !lastSensorMeasurement.accelerometer || !lastSensorMeasurement.gyroscope) {
      return 'notResponding';
    }
    // var acc = lastSensorMeasurement.accelerometer;
    // if (!acc.x || acc.y || !acc.z || !acc.gravityX || !acc.gravityY || !acc.gravityZ || !acc.interval) {
    //   return 'notResponding';
    // }
    var gyro = lastSensorMeasurement.gyroscope;
    if (!gyro.alpha || !gyro.beta || !gyro.gamma) {
      return 'notResponding';
    }
    return 'enabled';
  }

  private accelerometerSubject = new BehaviorSubject<AccelerometerData>({
    x: null,
    y: null,
    z: null,
    gravityX: null,
    gravityY: null,
    gravityZ: null,
    interval: null
  });
  private gyroscopeSubject = new BehaviorSubject<GyroscopeData>({
    alpha: null,
    beta: null,
    gamma: null
  });

  constructor() {}

  public getLastAccelerometerData(): AccelerometerData {
    return this.accelerometerSubject.getValue();
  }

  public getLastGyroscopeData(): GyroscopeData {
    return this.gyroscopeSubject.getValue();
  }

  public getLastSensorMeasurement(): SensorMeasurement {
    return {
      gyroscope: this.getLastGyroscopeData(),
      accelerometer: this.getLastAccelerometerData()
    }
  }

  private handleOrientation(event: DeviceOrientationEvent): void {
    this.lastUpdateTimestamp = new Date().getTime();
    this.gyroscopeSubject.next({
      alpha: event.alpha,
      beta: event.beta,
      gamma: event.gamma
    });
  }

  private handleMotion(event: DeviceMotionEvent): void {
    this.lastUpdateTimestamp = new Date().getTime();
    const accelerometerData: AccelerometerData = {
      x: event.acceleration?.x ?? null,
      y: event.acceleration?.y ?? null,
      z: event.acceleration?.z ?? null,
      gravityX: event.accelerationIncludingGravity?.x ?? null,
      gravityY: event.accelerationIncludingGravity?.y ?? null,
      gravityZ: event.accelerationIncludingGravity?.z ?? null,
      interval: event.interval ?? null
    };
    this.accelerometerSubject.next(accelerometerData);
  }

  public async startSensors(): Promise<void> {
    if (!this.isHttps()) {
      const msg = "Cannot start sensors, because of missing SSL encryption. Please use HTTPS.";
      console.error(msg);
      alert(msg);
      return;
    }

    if (this.isRunning) return;

    // Request permission for iOS 13+ devices
    if (
      DeviceMotionEvent &&
      typeof (DeviceMotionEvent as any).requestPermission === "function"
    ) {
      await (DeviceMotionEvent as any).requestPermission();
    }

    window.addEventListener("devicemotion", this.handleMotion.bind(this));
    window.addEventListener("deviceorientation", this.handleOrientation.bind(this));
    this.isRunning = true;
  }

  public stopSensors(): void {
    if (!this.isRunning) return;

    window.removeEventListener("devicemotion", this.handleMotion.bind(this));
    window.removeEventListener("deviceorientation", this.handleOrientation.bind(this));
    delete this.lastUpdateTimestamp;
    this.isRunning = false;
  }

  private isHttps() {
    return location.protocol === "https:";
  }
}
