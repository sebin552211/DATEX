import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalysisCardComponent } from './Analysiscard.component';

describe('CardComponent', () => {
  let component: AnalysisCardComponent;
  let fixture: ComponentFixture<AnalysisCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnalysisCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnalysisCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
