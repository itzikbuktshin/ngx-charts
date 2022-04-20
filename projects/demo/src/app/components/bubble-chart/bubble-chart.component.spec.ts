import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ComponentsModule } from '../components.module';

import { BubbleChartComponent } from './bubble-chart.component';

describe('BubbleChartComponent', () => {
  let component: BubbleChartComponent;
  let fixture: ComponentFixture<BubbleChartComponent>;
  
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BubbleChartComponent ],
      imports: [
        ComponentsModule
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BubbleChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
