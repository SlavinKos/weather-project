import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartModule } from 'angular2-highcharts';
import { HighchartsStatic } from 'angular2-highcharts/dist/HighchartsService';

import { 
	SharedModule,
	SystemRoutingModule,
	SystemComponent,
	WeatherDataComponent,
	WeatherService,
	TemperatureComponent,
	WindComponent,
	PressureComponent,
	HumidityComponent
} from './common/index';

declare var require: any;
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
