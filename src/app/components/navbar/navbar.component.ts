import {Component, ViewChild} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {DropdownModule} from 'primeng/dropdown';
import {Toolbar} from 'primeng/toolbar';
import {Select, SelectChangeEvent} from 'primeng/select';
import {CarService} from '../../service/car.service';
import {StorageService} from '../../service/storage.service';
import {Car} from '../../models/car.model';
import {AddCarDialogComponent} from '../dialogs/add-car-dialog.component/add-car-dialog.component';
import {NgIf} from '@angular/common';
import {SensorsService, SensorStatus} from '../../service/sensor.service';

export type CarOptionType = 'Car' | 'AddCar'
export interface CarOption {
  car?: Car;
  optionType: CarOptionType;
  displayText: string;
}

@Component({
  selector: 'app-navbar',
  imports: [
    FormsModule,
    DropdownModule,
    Toolbar,
    Select,
    AddCarDialogComponent,
    NgIf
  ],
  animations: [

  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
  standalone: true,
})
export class NavbarComponent {
  @ViewChild('carSelect') carSelect!: Select;
  @ViewChild(AddCarDialogComponent) addCarDialog!: AddCarDialogComponent;

  constructor(
    readonly carService: CarService,
    readonly storage: StorageService,
    readonly sensorsService: SensorsService,
  ) { }

  getCarSelectOptions(): CarOption[] {
    const options: CarOption[] = [];
    options.push({ optionType: 'AddCar', displayText: "Add car" } as CarOption);

    const cars = this.storage.getCars().sort((a, b) => {
      return a.name.localeCompare(b.name);
    })

    cars.forEach((car) => {
      options.push({
        car,
        displayText: car.name,
        optionType: 'Car',
      } as CarOption);
    })

    return options;
  }

  onCarSelectionChange(event: SelectChangeEvent) {
    if (!event || !event.value) {
      // -> Empty selection
      return;
    }

    const value = event.value as CarOption;
    if (value.optionType === 'AddCar') {
      // -> Add car
      this.carSelect!.writeValue(undefined);
      this.addCarDialog.openDialog();
    } else {
      // -> Car selected
      this.carService.selectCar(value.car!)
    }

  }
}
