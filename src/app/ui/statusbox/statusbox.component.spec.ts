import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusboxComponent } from './statusbox.component';

describe('StatusboxComponent', () => {
  let component: StatusboxComponent;
  let fixture: ComponentFixture<StatusboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatusboxComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StatusboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
