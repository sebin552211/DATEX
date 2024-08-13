import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphComponent1 } from './graph.component';

describe('GraphComponent', () => {
  let component: GraphComponent1;
  let fixture: ComponentFixture<GraphComponent1>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GraphComponent1]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GraphComponent1);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
