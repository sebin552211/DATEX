import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardcardComponent } from './Dashboardcard.component';

describe('CardComponent', () => {
  let component: DashboardcardComponent;
  let fixture: ComponentFixture<DashboardcardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardcardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardcardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
