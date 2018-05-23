import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as moment from 'moment';

import { environment } from '@env/environment';
import * as fromAppStore from '@state';
import { BaseWeatherClass } from '../../common/base-weather-class';

@Component({
	selector: 'ski-humidity',
	template: `
		<div class="chart-container">
			<chart [options]="options$ | async"></chart>
		</div>`,
})
export class HumidityComponent extends BaseWeatherClass implements OnInit {
	options$: Observable<Object>;
	optionsData: any;

	constructor(public _store: Store<fromAppStore.AppState>) {
		super(_store);
	}

	ngOnInit() {
		this.options$ = this._store.select(state => {
			if (state.weather.weather.length) {
				this.optionsData = state.weather.weather[0];
				return this.setChartData();
			}
		});
	}

	setChartData() {
		const data = {
			param: 'Humidity',
			format: '',
			series: {
				name: 'Humidity',
				type: 'column',
				data:  this.optionsData.list.map(day => {
					return day.main.humidity;
				}),
				tooltip: {
					valueSuffix: ''
				}
			}
		};
		return super.setChartData(data);
	}

}
