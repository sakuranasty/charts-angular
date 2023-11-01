import { Component } from '@angular/core';
import { Period, WeatherService } from './services/weather.service';
import { catchError, filter, map, repeat, shareReplay, switchMap } from 'rxjs/operators';
import * as moment from 'moment';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject, of } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private readonly weatherService: WeatherService) {}

  ngOnInit(): void {}

  range = new FormGroup({
    start: new FormControl<moment.MomentInput>(null, {
      nonNullable: true,
      validators: [
          Validators.required, 
      ]}),
    end: new FormControl<moment.MomentInput>(null, {
      nonNullable: true,
      validators: [
          Validators.required, 
      ]}),
  });

  currentPeriod$ = this.range.valueChanges.pipe(filter(() => this.range.valid))

  tempData$ = this.currentPeriod$.pipe(
    switchMap(timePeriod => this.weatherService.getTemperatureData<'temperature_2m'>(timePeriod)),
    map(data => {
      const values = data.hourly.temperature_2m;
      return data.hourly.time.map((t, idx) => {
        const utcTimestamp = moment.utc(t).valueOf();
        return [utcTimestamp, values[idx]]
      })
    }),
    shareReplay(1),
    catchError(e => {
      console.log(e);
      return of(null);
    }),
    repeat(),
  );
}


