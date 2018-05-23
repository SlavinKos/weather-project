import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as moment from 'moment';

import * as fromAppStore from '../../store/app.reducers';
import * as SelectedDayActions from './../store/selectedDay.actions';

import { environment } from '@env/environment';


export class BaseWeatherClass implements OnInit {
	protected apiIconUrl = environment.apiIconUrl;
	options$: Observable<Object>;
	chart: Object;
	selectedDay: any;
	temperature: boolean = false;
	optionsData: any;

	constructor(
		public _store: Store<fromAppStore.AppState>,
	) { }

	ngOnInit() {
	this.options$ = this._store.select(state => {
		if (state.weather.weather.length) {
			this.temperature = true;
			this.optionsData = state.weather.weather[0];
			return this.setChartData();
		}
	});
	}

	setChartData(data?) {

		return {
			chart: {
				zoomType: 'xy',
				width: null,
		},
		plotOptions: {
			series: {
					turboThreshold: 3000,
					cursor: 'pointer',
					point: {
							events: {
									click: function(e) {
										this.selectedDay = {
												city: this.optionsData.city.name,
												country: this.optionsData.city.country,
												temp: this.optionsData.list[e.point.x].main.temp,
												pres: this.optionsData.list[e.point.x].main.pressure,
												hum: this.optionsData.list[e.point.x].main.humidity,
												wind: this.optionsData.list[e.point.x].wind.speed,
												cloud: this.optionsData.list[e.point.x].clouds.all,
												date: moment.unix(this.optionsData.list[e.point.x].dt).format('dddd, D MMM'),
												weatherIcon: `${this.apiIconUrl}/${this.optionsData.list[e.point.x].weather[0].icon}.png`,
												weather: this.optionsData.list[e.point.x].weather[0].main
											};
										this._store.dispatch(new SelectedDayActions.SetSelectedDay(this.selectedDay));
									}.bind(this)
							}
					}
			}
	},
		title: {
				text: `${data.param} in ${this.optionsData.city.name}, ${this.optionsData.city.country}`
		},
		subtitle: {
				text: 'Source: OpenWeatherMap API'
		},
		xAxis: [{
				categories: this.optionsData.list.map(day => {
					return moment(day.dt_txt, 'YYYY-MM-DD').format('Do MMMM');
				}),
				crosshair: true
		}],
		yAxis: [{
			labels: {
					format: `{value}${data.format}`,
					style: { }
			},
			title: {
					text: `${data.param}`,
					style: { }
			}
	},
	],		tooltip: {
				shared: true
		},
		series: [data.series]
		};
	}

}
