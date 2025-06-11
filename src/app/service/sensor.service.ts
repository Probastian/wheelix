import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

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

@Injectable({
  providedIn: 'root'
})
export class SensorsService {
  private isRunning = false;
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

  public getAccelerometerData(): Observable<AccelerometerData> {
    return this.accelerometerSubject.asObservable();
  }

  public getGyroscopeData(): Observable<GyroscopeData> {
    return this.gyroscopeSubject.asObservable();
  }

  private handleOrientation(event: DeviceOrientationEvent): void {
    this.gyroscopeSubject.next({
      alpha: event.alpha,
      beta: event.beta,
      gamma: event.gamma
    });
  }

  private handleMotion(event: DeviceMotionEvent): void {
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
    this.isRunning = false;
  }
}
