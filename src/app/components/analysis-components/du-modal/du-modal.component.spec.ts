import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DuModalComponent } from './du-modal.component';

describe('DuModalComponent', () => {
  let component: DuModalComponent;
  let fixture: ComponentFixture<DuModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DuModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DuModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
