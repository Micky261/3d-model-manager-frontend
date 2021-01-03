import {NgModule} from '@angular/core';
import {NavbarComponent} from './navbar.component';
import {L10nTranslationModule} from "angular-l10n";
import {CommonModule} from "@angular/common";
import {NgbCollapseModule, NgbDropdownModule} from "@ng-bootstrap/ng-bootstrap";

@NgModule({
	declarations: [
		NavbarComponent
	],
	imports: [
		L10nTranslationModule,
		CommonModule,
		NgbCollapseModule,
		NgbDropdownModule
	],
	exports: [NavbarComponent]
})
export class NavbarModule {
}
