import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarRentalGuideComponent } from './car-rental-guide.component';

describe('CarRentalGuideComponent', () => {
  let component: CarRentalGuideComponent;
  let fixture: ComponentFixture<CarRentalGuideComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarRentalGuideComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarRentalGuideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
