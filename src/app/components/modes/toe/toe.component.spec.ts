import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToeComponent } from './toe.component';

describe('ToeComponent', () => {
  let component: ToeComponent;
  let fixture: ComponentFixture<ToeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ToeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
