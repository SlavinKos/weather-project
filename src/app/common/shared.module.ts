import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { MaterialModule } from './md/material.module';

@NgModule({
	imports: [
		FormsModule,
		MaterialModule,
	],
	exports: [
		FormsModule,
		MaterialModule,
	],
	declarations: []
})
export class SharedModule { }
