import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// Store
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AppComponent } from './app.component';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';
import { AppRoutingModule } from './app-routing.module';
import { SystemModule } from './system/system.module';

import { environment } from '@env/environment';

import { reducers } from './store/app.reducers';
import { WeatherEffects } from './system/store/weather.effects';

import 'hammerjs';

@NgModule({
	declarations: [
		AppComponent,
		NotFoundComponent
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
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
