import { Component, Input, OnInit } from '@angular/core';
import { ChartOptions, ColorType } from '../chartModel';

@Component({
  selector: 'app-barchart',
  templateUrl: './barchart.component.html',
  styleUrls: ['./barchart.component.scss']
})
export class BarChartComponent implements OnInit {
  labels = [];
  data = [];
  type = 'line';
  legend = true;
  colors: Array<ColorType>;

  // default settings
  options: ChartOptions = {
    responsive: true,
    legend: {
      position: 'top',
      labels: {
        fontSize: 10,
        usePointStyle: true
      }
    },
    scales: {
      xAxes: [{
        gridLineWidth: 0
      }],
      yAxes: [{
        gridLineWidth: 0
      }]
    }
  };

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

  constructor() { }

  ngOnInit(): void { }

  onChartClick(event): void {
    console.log(event);
  }
}
