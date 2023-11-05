import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import { LineChartModule } from '../../components/chart/line-chart/line-chart.module';
import { WeatherService } from '../../services/weather.service';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatFormFieldModule,
    HomeRoutingModule,
    LineChartModule,
  ],
  providers: [WeatherService],
  exports: [HomeComponent],
})
export class HomeModule {}
