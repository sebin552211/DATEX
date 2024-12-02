import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VOCFilterComponent } from './vocfilter.component';

describe('VOCFilterComponent', () => {
  let component: VOCFilterComponent;
  let fixture: ComponentFixture<VOCFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VOCFilterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VOCFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
