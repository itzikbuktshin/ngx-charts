import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { NgxBubbleChart } from './model/bubble-chart.model';
import { NgxBubbleChartService } from './ngx-bubble-chart.service';

@Component({
  selector: 'ngx-charts-ngx-bubble-chart',
  templateUrl: './ngx-bubble-chart.component.html',
  styleUrls: ['./ngx-bubble-chart.component.scss']
})
export class NgxBubbleChartComponent {
  private static Id = 0;
  public readonly id = `ngx-bubble-chart-${NgxBubbleChartComponent.Id++}`;

  @ViewChild('bubbleChart') public chartElm: ElementRef;

  @Input()
  set chart(chart: NgxBubbleChart) {
    const bubbles = chart?.bubbles?.map((bubble) => {
      return {
        ...bubble,
        selected: chart?.selectedBubbles?.includes(bubble.id)
      }
    });
    const bubbleChart: NgxBubbleChart = {
      ...chart,
      bubbles,
    }
    this.draw(bubbleChart);
  }

  constructor(private bubbleChartService: NgxBubbleChartService) { }

  private draw(bubbleChart: NgxBubbleChart) {
    const isMobile = false
    const minRadius: number = isMobile ? 45 : 35;
    const maxRadius: number = isMobile ? 80 : 90;

    setTimeout(() => {
      this.bubbleChartService.draw(bubbleChart.bubbles, bubbleChart.options.width, bubbleChart.options.height, minRadius, maxRadius, this.chartElm);
    }, 0);
  }
}