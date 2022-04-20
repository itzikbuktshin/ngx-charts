import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxBubbleChartComponent } from './ngx-bubble-chart.component';

describe('NgxBubbleChartComponent', () => {
  let component: NgxBubbleChartComponent;
  let fixture: ComponentFixture<NgxBubbleChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgxBubbleChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxBubbleChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
