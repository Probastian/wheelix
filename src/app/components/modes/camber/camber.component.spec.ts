import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CamberComponent} from './camber.component';

describe('CamberComponent', () => {
  let component: CamberComponent;
  let fixture: ComponentFixture<CamberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CamberComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CamberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
