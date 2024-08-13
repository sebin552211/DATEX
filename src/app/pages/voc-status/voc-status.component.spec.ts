import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VocStatusComponent } from './voc-status.component';

describe('VocStatusComponent', () => {
  let component: VocStatusComponent;
  let fixture: ComponentFixture<VocStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VocStatusComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VocStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
