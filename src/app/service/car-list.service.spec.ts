import { TestBed } from '@angular/core/testing';

import { CarListService } from './car-list.service';

describe('CarListService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CarListService = TestBed.get(CarListService);
    expect(service).toBeTruthy();
  });
});
