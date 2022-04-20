import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxBubbleChartModule } from 'ngx-charts';
import { BubbleChartComponent } from "./bubble-chart.component";

@NgModule({
  declarations: [BubbleChartComponent],
  imports: [
    CommonModule,
    NgxBubbleChartModule
  ],
  exports: [BubbleChartComponent]
})
export class BubbleChartModule { }
