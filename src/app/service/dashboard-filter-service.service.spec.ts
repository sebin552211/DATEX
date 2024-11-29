import { TestBed } from '@angular/core/testing';

import { DashboardFilterServiceService } from './dashboard-filter-service.service';

describe('DashboardFilterServiceService', () => {
  let service: DashboardFilterServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DashboardFilterServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
