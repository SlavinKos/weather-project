import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
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
		return this._http.get(`${this.getUrl(url)}/${data}`)
			.pipe(
				catchError((error: any) => Observable.throw('Error in http'))
			);
	}

}
