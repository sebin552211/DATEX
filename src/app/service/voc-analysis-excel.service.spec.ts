import { TestBed } from '@angular/core/testing';

import { VocAnalysisExcelService } from './voc-analysis-excel.service';

describe('VocAnalysisExcelService', () => {
  let service: VocAnalysisExcelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VocAnalysisExcelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
