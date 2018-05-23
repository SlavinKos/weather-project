import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

export interface SnackBarMessage {
	message: string,
	action?: string,
	duration?: number,
	status?: string
	// config?: any
};

@Injectable()
export class SnackService {

	public newMessage$: Subject<SnackBarMessage> = new Subject<SnackBarMessage>();
	public hide$: Subject<any> = new Subject<any>();

	public message(message: SnackBarMessage) {
		this.newMessage$.next(message);
	}

	public hideSb() {
		this.hide$.next();
	}

	constructor() { }

}
