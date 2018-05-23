import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { SystemRoutingModule } from './system-routing.module';

import { SystemComponent } from './system.component';
import { WeatherSearchComponent } from './weather-search/weather-search.component';
import { WeatherDataComponent } from './weather-data/weather-data.component';

import { WeatherService } from './services/weather.service';

import { ChartModule } from 'angular2-highcharts';
import { HighchartsStatic } from 'angular2-highcharts/dist/HighchartsService';
import { TemperatureComponent } from './weather-data/temperature/temperature.component';
import { WindComponent } from './weather-data/wind/wind.component';
import { PressureComponent } from './weather-data/pressure/pressure.component';
import { HumidityComponent } from './weather-data/humidity/humidity.component';

// for highcharts
declare var require : any;
export function highchartsFactory() {
	const hc = require('highcharts/highstock');
	const dd = require('highcharts/modules/exporting');
	dd(hc);
	return hc;
}

@NgModule({
	imports: [
		CommonModule,
		SystemRoutingModule,
		SharedModule,
		ChartModule
	],
	declarations: [
		SystemComponent,
		WeatherDataComponent,
		WeatherSearchComponent,
		TemperatureComponent,
		WindComponent,
		PressureComponent,
		HumidityComponent,
	],
	providers: [
		WeatherService,
		{
			provide: HighchartsStatic,
			useFactory: highchartsFactory
		}
	]
})
export class SystemModule { }
