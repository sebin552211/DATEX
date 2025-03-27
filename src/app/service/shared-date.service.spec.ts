import { TestBed } from '@angular/core/testing';

import { SharedDateService } from './shared-date.service';

describe('SharedDateService', () => {
  let service: SharedDateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SharedDateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
