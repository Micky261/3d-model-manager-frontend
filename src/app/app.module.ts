import {BrowserModule} from '@angular/platform-browser';
import {APP_INITIALIZER, CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {L10nIntlModule, L10nLoader, L10nTranslationModule} from "angular-l10n";
import {initL10n, l10nConfig} from "../i18n/l10-config";
import {FormsModule} from "@angular/forms";
import {registerLocaleData} from "@angular/common";
import localeDe from "@angular/common/locales/de";
import localeEn from "@angular/common/locales/en";
import {NavbarModule} from "../navbar/navbar.module";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {HttpClientModule} from "@angular/common/http";

registerLocaleData(localeDe);
registerLocaleData(localeEn);

@NgModule({
	declarations: [
		AppComponent
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		HttpClientModule,
		FormsModule,
		L10nTranslationModule.forRoot(l10nConfig),
		L10nIntlModule,
		NavbarModule,
		NgbModule
	],
	providers: [
		{
			provide: APP_INITIALIZER,
			useFactory: initL10n,
			deps: [L10nLoader],
			multi: true
		}
	],
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
	bootstrap: [AppComponent]
})
export class AppModule {
}
