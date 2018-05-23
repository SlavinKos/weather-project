import { Injectable } from '@angular/core';
import {
	HttpInterceptor,
	HttpRequest,
	HttpResponse,
	HttpEvent,
	HttpErrorResponse,
	HttpHandler
} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import 'rxjs/add/operator/do';

import { SnackService } from '../services/snack.service';


@Injectable()
export class SharedInterceptor implements HttpInterceptor {

	constructor(private _snackBar: SnackService) {}

	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		return next
			.handle(req)
			.do(event => { },
				(error: any) => {
					if (error instanceof HttpErrorResponse) {
						if (error.status === 404) {
							this._snackBar.message({ message: 'City not found please check the name or zip code' });
						}
					}
		});
	}

}
