import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalysisFilterComponent } from './analysis-filter.component';

describe('AnalysisFilterComponent', () => {
  let component: AnalysisFilterComponent;
  let fixture: ComponentFixture<AnalysisFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnalysisFilterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnalysisFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
