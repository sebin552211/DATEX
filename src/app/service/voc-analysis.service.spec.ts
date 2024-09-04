import { TestBed } from '@angular/core/testing';

import { VocAnalysisService } from './voc-analysis.service';

describe('VocAnalysisService', () => {
  let service: VocAnalysisService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VocAnalysisService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
