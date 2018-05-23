import * as WeatherActions from './weather.actions';

export interface State {
	weather: any[];
}

const initialState: State = {
	weather: []
};


export function weatherReducer(
	state = initialState,
	action: WeatherActions.WeatherActions
) {
	switch (action.type) {
		case WeatherActions.SET_WEATHER:
			return {
				...state,
				weather: [action.payload]
			};
		default:
			return state;
	}
}
