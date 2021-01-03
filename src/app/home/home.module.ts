import {NgModule} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {HomeComponent} from './home.component';
import {RouterModule} from "@angular/router";
import {L10nTranslationModule} from "angular-l10n";


@NgModule({
	declarations: [
		HomeComponent
	],
	imports: [
		CommonModule,
		FormsModule,
		RouterModule.forChild([{
			path: "",
			component: HomeComponent
		}]),
		L10nTranslationModule,
	]
})
export class HomeModule {
}
