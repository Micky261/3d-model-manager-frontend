import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {NgbCollapseModule, NgbDropdownModule} from "@ng-bootstrap/ng-bootstrap";
import {L10nTranslationModule} from "angular-l10n";
import {FlagsModule} from "nxt-flags";
import {NavbarComponent} from "./navbar.component";

@NgModule({
    declarations: [
        NavbarComponent
    ],
    imports: [
        L10nTranslationModule,
        CommonModule,
        NgbCollapseModule,
        NgbDropdownModule,
        RouterModule,
        FlagsModule,
    ],
    exports: [NavbarComponent]
})
export class NavbarModule {
}
