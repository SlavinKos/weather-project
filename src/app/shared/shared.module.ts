import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from './md/material.module';

@NgModule({
	imports: [
		FormsModule,
		ReactiveFormsModule,
		MaterialModule,
	],
	exports: [
		FormsModule,
		ReactiveFormsModule,
		MaterialModule,
	],
	declarations: []
})
export class SharedModule { }
