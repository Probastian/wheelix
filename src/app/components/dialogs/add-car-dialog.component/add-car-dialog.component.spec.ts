import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCarDialogComponent } from './add-car-dialog.component';

describe('AddCarDialogComponentComponent', () => {
  let component: AddCarDialogComponent;
  let fixture: ComponentFixture<AddCarDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddCarDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddCarDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
