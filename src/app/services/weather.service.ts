import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as moment from 'moment';
import {
  EMPTY,
  Observable,
  ReplaySubject,
  catchError,
  map,
  of,
  repeat,
  switchMap,
} from 'rxjs';

export type Period = {
  start?: moment.MomentInput;
  end?: moment.MomentInput;
};

interface WeatherApiResponse<T extends string> {
  hourly: {
    time: string[];
  } & {
    [key in T]: any[];
  };
  hourly_units: {
    time: string;
  } & {
    [key in T]: any[];
  };
}

@Injectable()
export class WeatherService {
  private readonly baseUrl =
    'https://archive-api.open-meteo.com/v1/archive?latitude=52.52&longitude=13.41';
  constructor(private readonly http: HttpClient) {}

  readonly currentPeriod$ = new ReplaySubject<Period>(1);

  readonly temperatureData$ = this.currentPeriod$.pipe(
    switchMap((p) => {
      return this.getTemperatureData(p);
    }),
    map((data) => {
      const values = data.hourly.temperature_2m;
      return this.transformData(data.hourly.time, values);
    })
  );

  readonly pressureData$ = this.currentPeriod$.pipe(
    switchMap((p) => {
      return this.getPressureData(p);
    }),
    map((data) => {
      const values = data.hourly.surface_pressure;
      return this.transformData(data.hourly.time, values);
    })
  );

  setCurrentPeriod(period: Period) {
    this.currentPeriod$.next(period);
  }

  getTemperatureData(period: Period) {
    return this.getData(period, 'temperature_2m');
  }

  getPressureData(period: Period) {
    return this.getData(period, 'surface_pressure');
  }

  private getData<T extends string>(
    period: Period,
    dataType: T
  ): Observable<WeatherApiResponse<T>> {
    const url = `${this.baseUrl}`;
    return this.http
      .get<WeatherApiResponse<T>>(url, {
        params: {
          ['start_date']: moment(period?.start).format('YYYY-MM-DD'),
          ['end_date']: moment(period?.end).format('YYYY-MM-DD'),
          hourly: dataType,
        },
      })
      .pipe(
        catchError((e) => {
          console.log(e);
          return EMPTY;
        }),
        repeat()
      );
  }
  private transformData(time: string[], values: number[]) {
    return time.map((t, idx) => {
      const utcTimestamp = moment.utc(t).valueOf();
      return [utcTimestamp, values[idx]];
    });
  }
}
