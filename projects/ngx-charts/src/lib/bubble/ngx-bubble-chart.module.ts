import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxBubbleChartComponent } from './ngx-bubble-chart.component';
import { NgxBubbleChartService } from './ngx-bubble-chart.service';

@NgModule({
  declarations: [NgxBubbleChartComponent],
  imports: [
    CommonModule
  ],
  providers: [NgxBubbleChartService],
  exports: [NgxBubbleChartComponent]
})
export class NgxBubbleChartModule { }
