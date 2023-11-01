import { Component } from '@angular/core';
import { WeatherService } from './services/weather.service';
import { tap } from 'rxjs/operators';

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

  tempData$ = this.weatherService.getTemperatureData().pipe(tap(console.log));

}
