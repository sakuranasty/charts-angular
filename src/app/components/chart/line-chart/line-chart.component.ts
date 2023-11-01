import { Component, Input, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import * as moment from 'moment';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss'],
})
export class LineChartComponent implements OnInit {
  @Input() seriesData: any;
  Highcharts: typeof Highcharts = Highcharts;

  constructor() {}

  chartOptions!: Highcharts.Options;

  ngOnInit() {
    console.log(this.seriesData);
    this.chartOptions = {
      xAxis: {
        type: 'datetime',
      },
      series: [
        {
          type: 'line',
          data: this.seriesData,
        },
      ],
    }; 
  }
}
