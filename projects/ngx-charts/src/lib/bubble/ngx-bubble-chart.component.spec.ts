import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxBubbleChartComponent } from './ngx-bubble-chart.component';
import { NgxBubbleChartService } from './ngx-bubble-chart.service';

describe('NgxBubbleChartComponent', () => {
  let component: NgxBubbleChartComponent;
  let fixture: ComponentFixture<NgxBubbleChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NgxBubbleChartComponent],
      providers: [NgxBubbleChartService]
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
