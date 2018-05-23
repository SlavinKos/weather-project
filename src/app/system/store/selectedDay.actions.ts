import { Action } from '@ngrx/store';
import { State } from './weather.reducers';

export const SET_SELECTED_DAY = 'SET_SELECTED_DAY';

export class SetSelectedDay implements Action {
	readonly type = SET_SELECTED_DAY;
	constructor(public payload: any) {
		console.log('reducer ', payload);
		
	}
}

export type SelectedDayActions = SetSelectedDay;
