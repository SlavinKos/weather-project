import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import {
	MatSnackBar,
	MatSnackBarConfig,
	MatSnackBarRef,
	MatSnackBarContainer
} from '@angular/material';
import { Subscription } from 'rxjs';

import { SnackService, SnackBarMessage } from './common/services/snack.service';

@Component({
	selector: 'ski-root',
	template: '<router-outlet></router-outlet>',
	styles: [`
	.custom-snackBar {
			background: darkred;
			color: #fff;
			font-weight: bold;
			box-shadow: 0px 0px 6px 4px #aaa;
	}
	`],
})
export class AppComponent implements OnInit, OnDestroy {
	private sub: Subscription = null;

	constructor(
		private _snackService: SnackService,
		private _snackBar: MatSnackBar
		) {}

	ngOnInit() {
			this._snackService.newMessage$.subscribe(m => this.showSnackBar(m));
			this._snackService.hide$.subscribe(h => this.hideMessage());
	}

	showSnackBar(message: SnackBarMessage) {
		const config = new MatSnackBarConfig();
		config.politeness = 'assertive';
		config.duration = message.duration || 5000;
		return this._snackBar.open(message.message, message.action || 'Close', config);
	}

	hideMessage() {
		this._snackBar.dismiss();
	}

	ngOnDestroy() {
		if (this.sub != null) {
			this.sub.unsubscribe();
		}
	}
}
