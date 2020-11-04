import { Component, OnInit, Input } from '@angular/core';
import { Color, Label } from 'ng2-charts';
import { ColorType } from '../chartModel';
import { ChartOptions } from 'chart.js';

@Component({
  selector: 'app-chart-pie',
  templateUrl: './pie.component.html',
  styleUrls: ['./pie.component.scss']
})
export class PieComponent implements OnInit {
  labels = [];
  data = [];
  type = 'pie';
  legend = true;
  plugins = [];

  // default settings
  options: ChartOptions =  {
    responsive: true,
    legend: {
      position: 'right',
      labels: {
        fontSize: 10,
        usePointStyle: true
      }

    },
    plugins: {
      datalabels: {
        formatter: (value, ctx) => {
          const label = ctx.chart.data.labels[ctx.dataIndex];
          return label;
        },
      },
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
}
