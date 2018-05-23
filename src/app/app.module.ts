import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import 'hammerjs';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { SystemModule } from './system/system.module';
import { reducers } from '@state';
import { WeatherEffects } from '@actions/weather.effects';
import { environment } from '@env/environment';
import { SharedInterceptor } from './common/interceptor/shared.interceptor';
import { SnackService } from './common/services/snack.service';

@NgModule({
	declarations: [
		AppComponent,
	],
	imports: [
		BrowserModule,
		HttpClientModule,
		BrowserAnimationsModule,
		AppRoutingModule,
		SystemModule,
		StoreModule.forRoot(reducers),
		EffectsModule.forRoot([WeatherEffects]),
		!environment.production ? StoreDevtoolsModule.instrument({ maxAge: 50 }) : null,
	],
	providers: [
		SnackService,
		{
			provide: HTTP_INTERCEPTORS,
			useClass: SharedInterceptor,
			multi: true,
		},
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
