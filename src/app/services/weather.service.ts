import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { Observable } from 'rxjs';

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

  getTemperatureData<T extends string>(
    period?: Period
  ): Observable<WeatherApiResponse<T>> {
    const url = `${this.baseUrl}`;
    return this.http.get<WeatherApiResponse<T>>(url, {
      params: {
        ['start_date']: moment(period?.start).format('YYYY-MM-DD'),
        ['end_date']: moment(period?.end).format('YYYY-MM-DD'),
        hourly: 'temperature_2m',
      },
    });
  }
}
