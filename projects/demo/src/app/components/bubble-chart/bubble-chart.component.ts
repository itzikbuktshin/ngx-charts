import { Component } from '@angular/core';
import { NgxBubbleChart } from "ngx-charts";

@Component({
  selector: 'demo-bubble-chart',
  templateUrl: './bubble-chart.component.html',
  styleUrls: ['./bubble-chart.component.scss']
})
export class BubbleChartComponent {

  public bubbleChart: NgxBubbleChart = {
    options: {
      width: 500,
      height: 500
    },
    selectedBubbles: [1],
    bubbles: [
      { id: 1, value: 10 },
      { id: 2, value: 30 },
      { id: 3, value: 20 },
      { id: 4, value: 8 },
      { id: 5, value: 15 },
      { id: 6, value: 7 },
      { id: 7, value: 7 },
      { id: 8, value: 104 },
      { id: 9, value: 140 },
    ]
  }

  add(): void {
    const nextId = this.getNextId();
    const bubbles = [
      ...this.bubbleChart.bubbles,
      {
        id: nextId,
        value: 55
      }
    ]
    this.refreshChart(bubbles);
  }

  remove(): void {
    const lestId = this.getLastAdded();
    if (!lestId) return;

    const bubbles = [
      ...this.bubbleChart.bubbles.filter((b) => b.id !== lestId)
    ]
    this.refreshChart(bubbles);
  }

  private getNextId(): number {
    const maxId = this.getLastAdded() || 0;
    return maxId + 1;
  }

  private getLastAdded(): number {
    const [max] = this.bubbleChart.bubbles.sort((a, b) => (a.id > b.id ? 1 : -1))
    return max?.id;
  }

  private refreshChart(bubbles): void {
    this.bubbleChart = {
      ...this.bubbleChart,
      bubbles
    };
  }
}