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


@Injectable()
export class SharedInterceptor implements HttpInterceptor {

	constructor() {}

	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		
		return next
			.handle(req)
			.do(event => {
				if (event instanceof HttpResponse) {
					console.log('response ', event);
				}
			},
			(error: any) => {
				if (error instanceof HttpErrorResponse) {
					if (error.status === 404) {
						console.log('error ', error);
						return;
					}
				}
		});
	}
	

}
