import { Component } from '@angular/core';
import { WeatherService } from './services/weather.service';
import { map, switchMap, tap } from 'rxjs/operators';
import * as moment from 'moment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private readonly weatherService: WeatherService) {}

  ngOnInit(): void {}

  getTemperature() {
    return this.weatherService.getTemperatureData();
  }

  tempData$ = this.weatherService.getTemperatureData<'temperature_2m'>().pipe(
    map(data => {
      const values = data.hourly.temperature_2m;
      return data.hourly.time.map((t, idx) => {
        const utcTimestamp = moment.utc(t).valueOf();
        return [utcTimestamp, values[idx]]
      })
    }),
  );

}
