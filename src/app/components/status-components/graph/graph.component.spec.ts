import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphComponent2 } from './graph.component';

describe('GraphComponent', () => {
  let component: GraphComponent2;
  let fixture: ComponentFixture<GraphComponent2>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GraphComponent2]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GraphComponent2);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
