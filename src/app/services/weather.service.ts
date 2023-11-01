import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

type Period = {
  startDate: Date;
  endDate: Date;
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
        ['start_date']: period?.startDate.toISOString() || '2022-12-31',
        ['end_date']: period?.endDate.toISOString() || '2023-08-31',
        hourly: 'temperature_2m',
      },
    });
  }
}
