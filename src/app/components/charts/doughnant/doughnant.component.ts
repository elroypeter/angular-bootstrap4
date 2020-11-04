import { Component, Input, OnInit } from '@angular/core';
import { Color } from 'ng2-charts';
import { ChartOptions, ColorType } from '../chartModel';

@Component({
  selector: 'app-chart-doughnant',
  templateUrl: './doughnant.component.html',
  styleUrls: ['./doughnant.component.scss']
})
export class DoughnantComponent implements OnInit {

  labels = [];
  data = [];
  type = 'doughnut';

  // default settings
  options: ChartOptions =  {
    cutoutPercentage: 80,
    aspectRatio: 1.5,
    responsive: true,
    legend: {
      position: 'right',
      labels: {
        fontSize: 10,
        usePointStyle: true
      }
    }
  };
  colors: Array<ColorType>;

  @Input()
  set chartLabels(value: Array<any>) {
    this.labels = value;
  }

  get chartLabels(): Array<any> {
    return this.labels;
  }

  @Input()
  set chartData(value: Array<any>) {
    this.data = value;
  }

  get chartData(): Array<any> {
    return this.data;
  }

  @Input()
  set chartType(value: string) {
    this.type = value;
  }

  get chartType(): string {
    return this.type;
  }

  @Input()
  set chartOptions(value: ChartOptions) {
    this.options = value;
  }

  get chartOptions(): ChartOptions {
    console.log('value ');
    return this.options;
  }

  @Input()
  set chartColors(value: Array<ColorType>) {
    this.colors = value;
  }

  get chartColors(): Array<ColorType> {
    return this.colors;
  }

  constructor() {

  }

  ngOnInit(): void {

  }
}
