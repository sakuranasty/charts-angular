import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

type Period = {
  startDate: Date;
  endDate: Date;
};

@Injectable()
export class WeatherService {
  private readonly baseUrl = 'https://archive-api.open-meteo.com/v1/archive?latitude=52.52&longitude=13.41';
  constructor(private readonly http: HttpClient) {}

  getTemperatureData(period?: Period) {
    const url = `${this.baseUrl}`;
    return this.http.get(url, {
      params: {
        ['start_date']: period?.startDate.toISOString() || '2022-12-31',
        ['end_date']: period?.endDate.toISOString() || '2023-08-31',
        hourly: 'temperature_2m',
      },
    });
  }
}
