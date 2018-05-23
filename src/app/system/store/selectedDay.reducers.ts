import * as SelectedActions from './selectedDay.actions';
import * as moment from 'moment';

export interface State {
	selectedDay: any [ ];
}

const initialState: State = {
	selectedDay: [
		// {
		// 	city: '',
		// 	country: '',
		// 	temp: '',
		// 	pres: '',
		// 	hum: '',
		// 	wind: '',
		// 	cloud: '',
		// 	date: '',
		// }
	]
};

export function selectedDay(
	state = initialState,
	action: SelectedActions.SelectedDayActions
) {
	switch (action.type) {
		case SelectedActions.SET_SELECTED_DAY:
			return {
				...state,
				selectedDay: [action.payload]
			};
		default:
			return state;
	}
}
