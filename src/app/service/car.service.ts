import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Car } from '../models/car.model';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class CarService {
  private carsSubject = new BehaviorSubject<Car[]>([]);
  private selectedCarSubject = new BehaviorSubject<Car | null>(null);

  cars$ = this.carsSubject.asObservable();
  selectedCar$ = this.selectedCarSubject.asObservable();

  constructor(private storage: StorageService) {
    this.loadCars();
  }

  private loadCars() {
    const cars = this.storage.getCars();
    this.carsSubject.next(cars);
  }

  addCar(car: Car) {
    const currentCars = this.carsSubject.getValue();
    const updatedCars = [...currentCars, car];
    this.storage.saveCars(updatedCars);
    this.carsSubject.next(updatedCars);
  }

  selectCar(car: Car | null) {
    console.log('Selected car:', car);
    this.selectedCarSubject.next(car);
  }

  getSelectedCar(): Car | null {
    return this.selectedCarSubject.getValue();
  }
}
