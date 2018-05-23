import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { environment } from '@env/environment';

@Injectable({
	providedIn: 'root'
})
export class WeatherService {
	protected apiUrl = environment.apiUrl;
	protected apiIconUrl = environment.apiIconUrl;
	protected appKey = environment.appKey;

	constructor(public _http: HttpClient) {}

	getWeather(param): Observable<any> {
		return this._http.get(`${this.apiUrl}?q=${param}&cnt=16&appid=${this.appKey}&units=metric`);
			// .pipe(catchError((error: any) => Observable.throw(error.json())));
	}

}
