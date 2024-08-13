import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VocAnalysisComponent } from './voc-analysis.component';

describe('VocAnalysisComponent', () => {
  let component: VocAnalysisComponent;
  let fixture: ComponentFixture<VocAnalysisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VocAnalysisComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VocAnalysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
