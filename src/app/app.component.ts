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
  constructor() {}

  ngOnInit(): void {}
}
