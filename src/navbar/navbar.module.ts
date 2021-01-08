import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";
import {NgbCollapseModule, NgbDropdownModule} from "@ng-bootstrap/ng-bootstrap";
import {L10nTranslationModule} from "angular-l10n";
import {NavbarComponent} from "./navbar.component";

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
