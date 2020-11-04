export interface ChartOptions {
  cutoutPercentage?: number;
  aspectRatio?: number;
  responsive?: boolean;
  legend: LegendOptions;
  scales?: ScalesOptions;
}

export interface LegendOptions {
  position: string;
  labels: {
    fontSize: number;
    usePointStyle: boolean;
  };
}

export interface ScalesOptions {
    xAxes: Array<any>;
    yAxes: Array<any>;
}

export interface ColorType {
  backgroundColor: Array<any>;
}
