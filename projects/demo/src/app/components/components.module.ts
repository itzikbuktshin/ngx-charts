import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BubbleChartModule } from './bubble-chart/bubble-chart.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    BubbleChartModule
  ],
  exports:[BubbleChartModule ]
})
export class ComponentsModule { }