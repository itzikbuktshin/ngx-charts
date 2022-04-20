import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BubbleChartComponent } from './components/bubble-chart/bubble-chart.component';

const routes: Routes = [
  {
    path:'',
    redirectTo: 'bubbles',
    pathMatch: 'full'
  },
  {
    path: 'bubbles',
    component: BubbleChartComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
