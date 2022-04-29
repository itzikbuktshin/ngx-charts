import { TestBed } from '@angular/core/testing';

import { NgxBubbleChartService } from './ngx-bubble-chart.service';

describe('NgxBubbleChartService', () => {
  let service: NgxBubbleChartService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers:[NgxBubbleChartService]
    });
    service = TestBed.inject(NgxBubbleChartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
