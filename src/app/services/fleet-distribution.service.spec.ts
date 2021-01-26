import { TestBed } from '@angular/core/testing';

import { FleetDistributionService } from './fleet-distribution.service';

describe('FleetDistributionService', () => {
  let service: FleetDistributionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FleetDistributionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
