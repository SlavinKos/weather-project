import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import * as fromAppStore from '../../store/app.reducers';

@Component({
	selector: 'ski-weather-data',
	templateUrl: './weather-data.component.html',
	styleUrls: ['./weather-data.component.scss']
})
export class WeatherDataComponent implements OnInit {
	selectedDay$: Observable <any>;
	show: boolean: false;

	constructor(
		private _store: Store<fromAppStore.AppState>
	) { }

	ngOnInit() {
		this.selectedDay$ =	this._store.select(state => {
			if (state.selectedDay.selectedDay.length) {
				console.log('weather ', state.selectedDay.selectedDay);
				
				this.show = true;
				return state.selectedDay.selectedDay;
			}
		});
	}

}
