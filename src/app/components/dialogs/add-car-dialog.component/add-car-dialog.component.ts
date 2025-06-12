import { Component, Output, EventEmitter } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormArray,
  Validators,
  ReactiveFormsModule,
  FormArrayName,
  FormGroupName,
  FormsModule, NonNullableFormBuilder, ValidatorFn, ValidationErrors, AbstractControl, FormControl
} from '@angular/forms';
import {Dialog} from 'primeng/dialog';
import {InputText} from 'primeng/inputtext';
import {Divider} from 'primeng/divider';
import {Card} from 'primeng/card';
import {NgForOf, NgTemplateOutlet} from '@angular/common';
import {Button} from 'primeng/button';
import {InputNumber} from 'primeng/inputnumber';
import {StorageService} from '../../../service/storage.service';
import {Car} from '../../../models/car.model';
import {MeasurementTargetValues} from '../../../models/measurement-target-values.model';

@Component({
  selector: 'app-add-car-dialog',
  imports: [
    Dialog,
    InputText,
    Divider,
    Card,
    NgTemplateOutlet,
    Button,
    ReactiveFormsModule,
    NgForOf,
    FormsModule,
    InputNumber,
  ],
  templateUrl: './add-car-dialog.component.html',
  styleUrl: './add-car-dialog.component.css'
})
export class AddCarDialogComponent {
  protected visible = false;

  public carDataForm: FormGroup;
  public tyreNames = ['FL', 'FR', 'RL', 'RR'];

  constructor(
    readonly fb: NonNullableFormBuilder,
    readonly storageService: StorageService,
  ) {
    this.carDataForm = this.fb.group({
      carName: ['', [Validators.required, Validators.minLength(1)]],
      tyres: this.fb.array(
        this.tyreNames.map(name =>
          this.fb.group({
            name: [name],
            toeMin: [0, [Validators.required]],
            toeMax: [0, [Validators.required]],
            camberMin: [0, [Validators.required]],
            camberMax: [0, [Validators.required]]
          })
        )
      )
    });
  }

  get tyres(): FormArray {
    return this.carDataForm.get('tyres') as FormArray;
  }

  openDialog() {
    this.carDataForm.reset();
    this.visible = true;
  }

  closeDialog() {
    this.visible = false;
  }

  isDialogOpen() {
    return this.visible;
  }

  protected saveNewCar(): void {
    if (this.carDataForm.valid) {
      const values = this.carDataForm.value;
      const targetVals = this.tyresArrToTargetVals(values.tyres);
      const newCar: Car = {
        name: values.carName as string,
        frontLeft: targetVals['FL'],
        frontRight: targetVals['FR'],
        rearLeft: targetVals['RL'],
        rearRight: targetVals['RR']
      } as Car;

      this.storageService.addCar(newCar);

      this.closeDialog();
    }
  }

  validateForm(): void {
    console.info("validating...", this.carDataForm.errors);
    // this.validateAllFormFields(this.carDataForm);
  }

  tyresArrToTargetVals(tyresArr: any[]): { [key: string]: MeasurementTargetValues } {
    const out: { [key: string]: MeasurementTargetValues } = {};
    for (const tyreObj of tyresArr) {
      out[tyreObj['name']] = {
        camberMin: tyreObj['camberMin'],
        camberMax: tyreObj['camberMax'],
        toeMin: tyreObj['toeMin'],
        toeMax: tyreObj['toeMax'],
      };
    }
    return out;
  }

  // validateAllFormFields(formGroup: FormGroup) {
  //   Object.keys(formGroup.controls).forEach(field => {
  //     const control = formGroup.get(field);
  //     if (control instanceof FormControl) {
  //       control.markAsTouched({ onlySelf: true });
  //     } else if (control instanceof FormGroup) {
  //       this.validateAllFormFields(control);
  //     }
  //   });
  // }
}
