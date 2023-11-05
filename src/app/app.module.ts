import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { WeatherService } from './services/weather.service';
import { MatMomentDateModule } from '@angular/material-moment-adapter';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatMomentDateModule,
  ],
  providers: [WeatherService],
  bootstrap: [AppComponent],
})
export class AppModule {}
