import { Actions, Effect } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';

import 'rxjs/add/observable/throw';

import { WeatherService } from '../services/weather.service';
import * as WeatherActions from './weather.actions';
import * as SelectedDayActions from './selectedDay.actions';
import { environment } from '@env/environment';

import * as moment from 'moment';

@Injectable()
export class WeatherEffects {
	@Effect()
	fetchWeather = this._actions$
		.ofType(WeatherActions.FETCH_WEATHER)
		.pipe(
			switchMap((action: WeatherActions.FetchWeather) => {
				return this._weatherS.getWeather(action.payload)
					.pipe(
						map(weather => {
							return {
								type: WeatherActions.SET_WEATHER,
								payload: weather
							};
						}),
						catchError((error: any) => of(new WeatherActions.SetError(error)))
					);
		})
	);

	constructor(
		private _actions$: Actions,
		private _weatherS: WeatherService
	) { }
}
