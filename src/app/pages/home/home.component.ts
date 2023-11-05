import { ChangeDetectorRef, Component, Input, OnChanges, OnInit } from '@angular/core';
import { Period, WeatherService } from '../../services/weather.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as moment from 'moment';
import { filter, startWith, switchMap, map, shareReplay, catchError, of, repeat, tap } from 'rxjs';
import { ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit {
  constructor(
    private readonly weatherService: WeatherService) {}

  ngOnInit(): void {}

  initialDatePeriod: Period = {
    start: moment().subtract({days: 12}),
    end: moment().subtract({days: 1}),
  }

  range = new FormGroup({
    start: new FormControl<moment.MomentInput>(null, {
      nonNullable: true,
      validators: [Validators.required],
    }),
    end: new FormControl<moment.MomentInput>(null, {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });

  currentPeriod$ = this.range.valueChanges.pipe(
    filter(v => {
      if(!v.start || !v.end) {
        return false;
      }
      v.start = moment(v.start);
      v.end = moment(v.end);
      if (!v.start.isAfter(v.end)) {
        return true;
      }
      if (
        v.end.isBefore(moment().subtract({ days: 1 })) &&
        v.start.isBefore(moment().subtract({ days: 1 }))
      ) {
        return true;
      }
      return false;
    }),
    startWith(this.initialDatePeriod),
    tap(v => this.weatherService.setCurrentPeriod(v))
  );

  tempData$ = this.weatherService.temperatureData$;
  pressureData$ = this.weatherService.pressureData$;

  // tempData1$ = this.currentPeriod$.pipe(
  //   switchMap((timePeriod) =>
  //     this.weatherService.getTemperatureData(timePeriod)
  //   ),
  //   map((data) => {
  //     const values = data.hourly.temperature_2m;
  //     return data.hourly.time.map((t, idx) => {
  //       const utcTimestamp = moment.utc(t).valueOf();
  //       return [utcTimestamp, values[idx]];
  //     });
  //   }),
  //   shareReplay(1),
  //   catchError((e) => {
  //     console.log(e);
  //     return of(null);
  //   }),
  //   repeat()
  // );
}
