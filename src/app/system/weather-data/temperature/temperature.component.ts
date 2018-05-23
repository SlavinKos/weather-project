import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as moment from 'moment';

import * as fromAppStore from '../../../store/app.reducers';
import * as SelectedDayActions from '../../store/selectedDay.actions';

import { environment } from '@env/environment';

@Component({
	selector: 'ski-temperature',
	template: '<chart [options]="options$ | async"></chart> text',
})
export class TemperatureComponent implements OnInit, AfterViewInit {
	protected apiIconUrl = environment.apiIconUrl;
	options$: Observable<Object>;
	chart: Object;
	selectedDay: any;
	temperature: any;

	constructor(
		private _store: Store<fromAppStore.AppState>
	) { }

	ngOnInit() {
	this.options$ = this._store.select(state => {
		if (state.weather.weather.length) {
			return this.setChartData(state.weather.weather[0]);
		}
	});
			// .subscribe(w => {
			// 	if (w.length) {
			// 		this.temperature = w[0];
			// 		console.log('1', this.temperature);
			// 		console.log(w);
			// 	}
			// });
	}

	setChartData(options) {
		console.log('options ', options);
		// setTimeout(() => {
		return {
			chart: {
				zoomType: 'xy'
		},
		plotOptions: {
			series: {
					turboThreshold: 3000,
					cursor: 'pointer',
					point: {
							events: {
									click: function(e) {
										
										// this.selectedDay = {};
										console.log('before ', this.selectedDay);
										
										this.selectedDay = {
												city: options.city.name,
												country: options.city.country,
												temp: options.list[e.point.x].main.temp,
												pres: options.list[e.point.x].main.pressure,
												hum: options.list[e.point.x].main.humidity,
												wind: options.list[e.point.x].wind.speed,
												cloud: options.list[e.point.x].clouds.all,
												date: moment.unix(options.list[e.point.x].dt).format('dddd, D MMM'),
												weatherIcon: `${this.apiIconUrl}/${options.list[e.point.x].weather[0].icon}.png`
											};
										this._store.dispatch(new SelectedDayActions.SetSelectedDay(this.selectedDay));
										console.log('set day ', this.selectedDay);
									}.bind(this)
							}
					}
			}
	},
		title: {
				text: `Temperature in ${options.city.name}`
		},
		subtitle: {
				text: 'Source: OpenWeatherMap API'
		},
		xAxis: [{
				categories: options.list.map(day => {
					return moment(day.dt_txt, 'YYYY-MM-DD').format('Do MMMM');
				}),
				crosshair: true
		}],
		yAxis: [{ // Primary yAxis
				labels: {
						format: '{value}°C',
						style: {
								// color: Highcharts.getOptions().colors[1]
						}
				},
				title: {
						text: 'Temperature',
						style: {
								// color: Highcharts.getOptions().colors[1]
						}
				}
		},
		],
		tooltip: {
				shared: true
		},
		// legend: {
		// 		layout: 'vertical',
		// 		align: 'left',
		// 		x: 120,
		// 		verticalAlign: 'top',
		// 		y: 100,
		// 		floating: true,
		// 		backgroundColor:  '#FFFFFF'
		// },
		series: [{
				name: 'Temperature',
				type: 'column',
				data: options.list.map(day => {
					return day.main.temp;
				}),
				tooltip: {
						valueSuffix: '°C'
				}
		}]
		};
		// }, 1500);
	}

	ngAfterViewInit() {
		if (this.temperature !== undefined) {
			console.log('wer ', this.temperature);

		setTimeout(() => {
		// 	this.options = {
		// 		chart: {
		// 			zoomType: 'xy'
		// 	},
		// 	plotOptions: {
		// 		series: {
		// 				turboThreshold: 3000,
		// 				cursor: 'pointer',
		// 				point: {
		// 						events: {
		// 								click: function(e) {
		// 									console.log(e.point);
		// 									this.selectedDay = {};
		// 									this.selectedDay = {
		// 											city: this.temperature.city.name,
		// 											country: this.temperature.city.country,
		// 											temp: this.temperature.list[e.point.x].main.temp,
		// 											pres: this.temperature.list[e.point.x].main.pressure,
		// 											hum: this.temperature.list[e.point.x].main.humidity,
		// 											wind: this.temperature.list[e.point.x].wind.speed,
		// 											cloud: this.temperature.list[e.point.x].clouds.all,
		// 											date: moment.unix(this.temperature.list[e.point.x].dt).format('dddd, D MMM')
		// 										};
		// 									this._store.dispatch(new SelectedDayActions.SetSelectedDay(this.selectedDay));
		// 									console.log(this.selectedDay);
		// 								}.bind(this)
		// 						}
		// 				}
		// 		}
		// },
		// 	title: {
		// 			text: `Temperature in ${this.temperature.city.name}`
		// 	},
		// 	subtitle: {
		// 			text: 'Source: OpenWeatherMap API'
		// 	},
		// 	xAxis: [{
		// 			categories: this.temperature.list.map(day => {
		// 				return moment(day.dt_txt, 'YYYY-MM-DD').format('Do MMMM');
		// 			}),
		// 			crosshair: true
		// 	}],
		// 	yAxis: [{ // Primary yAxis
		// 			labels: {
		// 					format: '{value}°C',
		// 					style: {
		// 							// color: Highcharts.getOptions().colors[1]
		// 					}
		// 			},
		// 			title: {
		// 					text: 'Temperature',
		// 					style: {
		// 							// color: Highcharts.getOptions().colors[1]
		// 					}
		// 			}
		// 	},
		// 	],
		// 	tooltip: {
		// 			shared: true
		// 	},
		// 	// legend: {
		// 	// 		layout: 'vertical',
		// 	// 		align: 'left',
		// 	// 		x: 120,
		// 	// 		verticalAlign: 'top',
		// 	// 		y: 100,
		// 	// 		floating: true,
		// 	// 		backgroundColor:  '#FFFFFF'
		// 	// },
		// 	series: [{
		// 			name: 'Temperature',
		// 			type: 'column',
		// 			data: this.temperature.list.map(day => {
		// 				return day.main.temp;
		// 			}),
		// 			tooltip: {
		// 					valueSuffix: '°C'
		// 			}
		// 	}]
		// 	};
		}, 1500);
	}
	}

}
