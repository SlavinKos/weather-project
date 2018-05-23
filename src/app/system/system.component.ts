import { Component, OnInit } from '@angular/core';
import { Observable, Subject, of } from 'rxjs';
import { filter, debounceTime, distinctUntilChanged, switchMap, mergeMap, map } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import * as WeatherActions from './store/weather.actions';
import * as SelectedDayActions from './store/selectedDay.actions';
import * as fromAppStore from '../store/app.reducers';
import { WeatherService } from './services/weather.service';

import * as moment from 'moment';

import { environment } from '@env/environment';

@Component({
	selector: 'ski-system',
	templateUrl: './system.component.html',
})
export class SystemComponent implements OnInit {
	protected apiIconUrl = environment.apiIconUrl;
	search: string;
	weatherData: boolean = false;
	weatherIcon: string;
	dayInit: {};
	selectedDay$: Observable<any>;

	weatherRes: any;
	city: string;
	country: string;
	show: boolean = false;
	

	constructor(
			private _weatherS: WeatherService,
			private _store: Store<fromAppStore.AppState>
		) { }

	ngOnInit() {
		this._store.select('weather')
			.subscribe((weather: any) => {
				if (weather.weather.length) {
				const w = weather.weather[0];
				console.log(w);
				this.show = true;
					this.dayInit = {
							city: w.city.name,
							country: w.city.country,
							temp: w.list[0].main.temp,
							pres: w.list[0].main.pressure,
							hum: w.list[0].main.humidity,
							wind: w.list[0].wind.speed,
							cloud: w.list[0].clouds.all,
							date: moment.unix(w.list[0].dt).format('dddd, D MMM'),
							weatherIcon: `${this.apiIconUrl}/${w.list[0].weather[0].icon}.png`,
							weather: w.list[0].weather[0].main
						};
				this._store.dispatch(new SelectedDayActions.SetSelectedDay(this.dayInit));
				}
			});

			this.selectedDay$ =	this._store.select(state => {
				if (state.selectedDay.selectedDay.length) {
					return state.selectedDay.selectedDay;
				}
			});
	}

	getWeather() {
		this._store.dispatch(new WeatherActions.FetchWeather(this.search));
	}

}
