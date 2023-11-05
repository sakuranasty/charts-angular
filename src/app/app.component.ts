import { Component } from '@angular/core';
import { Period, WeatherService } from './services/weather.service';
import {
  catchError,
  filter,
  map,
  repeat,
  shareReplay,
  startWith,
  switchMap,
} from 'rxjs/operators';
import * as moment from 'moment';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject, of } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(private readonly weatherService: WeatherService) {}

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
    startWith(this.initialDatePeriod)
  );

  tempData$ = this.currentPeriod$.pipe(
    switchMap((timePeriod) =>
      this.weatherService.getTemperatureData<'temperature_2m'>(timePeriod)
    ),
    map((data) => {
      const values = data.hourly.temperature_2m;
      return data.hourly.time.map((t, idx) => {
        const utcTimestamp = moment.utc(t).valueOf();
        return [utcTimestamp, values[idx]];
      });
    }),
    shareReplay(1),
    catchError((e) => {
      console.log(e);
      return of(null);
    }),
    repeat()
  );
}
