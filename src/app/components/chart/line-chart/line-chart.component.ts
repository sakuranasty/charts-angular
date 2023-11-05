import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import * as Highcharts from 'highcharts';
import HC_exporting from 'highcharts/modules/histogram-bellcurve';
import {
  Observable,
  ReplaySubject,
  combineLatest,
  map,
  shareReplay,
  startWith,
} from 'rxjs';
HC_exporting(Highcharts);

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LineChartComponent implements OnInit {
  constructor() {}

  data$ = new ReplaySubject<any[]>(1);
  mode$ = new ReplaySubject<'line' | 'histogram'>(1);

  @Input() set seriesData(v: any[]) {
    this.data$.next(v);
  }

  mode = new FormControl<'line' | 'histogram'>('line', Validators.required);

  Highcharts: typeof Highcharts = Highcharts;

  chartOptions$!: Observable<Highcharts.Options>;

  ngOnInit() {
    this.chartOptions$ = combineLatest([
      this.data$,
      this.mode.valueChanges.pipe(startWith('line')),
    ]).pipe(
      map(([data, mode]) => {
        return {
          xAxis: {
            type: 'datetime',
          },
          series: [
            {
              type: mode,
              data,
            },
          ],
        } as Highcharts.Options;
      }),
      shareReplay(1)
    );
  }
}
