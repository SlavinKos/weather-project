import { Action } from '@ngrx/store';
import { State } from './weather.reducers';

export const FETCH_WEATHER = 'FETCH_WEATHER';
export const SET_WEATHER = 'SET_WEATHER';


export class FetchWeather implements Action {
	readonly type = FETCH_WEATHER;
	constructor(public payload: any) { }
}

export class SetWeather implements Action {
	readonly type = SET_WEATHER;
	constructor(public payload: any) {
		// console.log('payload', payload);
	}
}


export type WeatherActions = FetchWeather | SetWeather;
