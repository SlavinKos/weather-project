import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SystemComponent } from './system.component';
import { WindComponent } from './weather-data/wind/wind.component';
import { TemperatureComponent } from './weather-data/temperature/temperature.component';
import { PressureComponent } from './weather-data/pressure/pressure.component';
import { HumidityComponent } from './weather-data/humidity/humidity.component';

const routes: Routes = [
	{ path: 'weather', component: SystemComponent, children: [
		{ path: '', redirectTo: 'wind', pathMatch: 'full' },
		{ path: 'wind', component: WindComponent },
		{ path: 'temperature', component: TemperatureComponent },
		{ path: 'pressure', component: PressureComponent },
		{ path: 'humidity', component: HumidityComponent },
	]}
];

@NgModule({
	imports: [
		RouterModule.forChild(routes)
	],
	exports: [
		RouterModule
	]
})
export class SystemRoutingModule { }
