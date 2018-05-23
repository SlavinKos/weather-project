import { ActionReducerMap } from '@ngrx/store';

import * as fromWeather from '../system/store/weather.reducers';
import * as fromSelectedDay from '../system/store/selectedDay.reducers';

export interface AppState {
	weather: fromWeather.State;
	selectedDay: fromSelectedDay.State;
}

export const reducers: ActionReducerMap<AppState> = {
	weather: fromWeather.weatherReducer,
	selectedDay: fromSelectedDay.selectedDay
};
