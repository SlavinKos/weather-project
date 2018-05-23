import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { environment } from '@env/environment';

@Injectable()
export class BaseAPI {
	protected apiUrl = environment.apiUrl;

	constructor(public _http: HttpClient) {}

	private getUrl(url: string): string {
		return this.apiUrl + url;
	}

	public _get(url: string, data?: any): Observable<any> {
		return this._http.get(`${this.getUrl(url)}/${data}`);
	}

	public handlError(err: HttpErrorResponse) {
		console.log('error in http request', err);
		return Observable.throw(err.message || err);
	}
}
