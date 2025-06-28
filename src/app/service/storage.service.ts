import {Injectable} from '@angular/core';
import {Car} from '../models/car.model';
import {WheelMeasurement} from '../models/tire-measurement.model';
import {AlignmentResult} from '../models/alignment-result';

@Injectable({ providedIn: 'root' })
export class StorageService {
  private readonly CARS_KEY = 'gyraline_cars';
  private readonly MEAS_KEY = 'gyraline_measurements';
  private readonly ALIGNMENT_RESULTS_KEY = 'gyraline_alignment_results';

  getCars(): Car[] {
    return JSON.parse(localStorage.getItem(this.CARS_KEY) || '[]');
  }

  addCar(car: Car) {
    console.log("Adding car to saved cars list.", car);
    const cars = this.getCars();
    const index = cars.findIndex(c => c.id === car.id);
    if (index >= 0) {
      cars[index] = car;
    } else {
      cars.push(car);
    }
    localStorage.setItem(this.CARS_KEY, JSON.stringify(cars));
  }

  saveCars(cars: Car[]) {
    localStorage.setItem(this.CARS_KEY, JSON.stringify(cars));
  }

  deleteCar(carId: string) {
    const cars = this.getCars().filter(c => c.id !== carId);
    this.saveCars(cars);
  }

  getMeasurements(): WheelMeasurement[] {
    return JSON.parse(localStorage.getItem(this.MEAS_KEY) || '[]');
  }

  saveMeasurements(ms: WheelMeasurement[]) {
    localStorage.setItem(this.MEAS_KEY, JSON.stringify(ms));
  }

  addMeasurement(m: WheelMeasurement) {
    const all = this.getMeasurements();
    all.push(m);
    this.saveMeasurements(all);
  }

  getAlignmentResults(): AlignmentResult[] {
    return JSON.parse(localStorage.getItem(this.ALIGNMENT_RESULTS_KEY) || '[]');
  }

  saveAlignmentResult(result: AlignmentResult) {
    const results = this.getAlignmentResults();
    results.push(result);
    localStorage.setItem(this.ALIGNMENT_RESULTS_KEY, JSON.stringify(results));
  }

  getAlignmentResultsForCar(carId: string): AlignmentResult[] {
    return this.getAlignmentResults().filter(result => result.carId === carId);
  }
}
