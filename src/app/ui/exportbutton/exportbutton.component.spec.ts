import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExportbuttonComponent } from './exportbutton.component';

describe('ExportbuttonComponent', () => {
  let component: ExportbuttonComponent;
  let fixture: ComponentFixture<ExportbuttonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExportbuttonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExportbuttonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
