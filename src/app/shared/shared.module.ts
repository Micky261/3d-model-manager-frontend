import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {L10nTranslationModule} from "angular-l10n";
import {ModelCardsElementComponent} from "./model-cards-element/model-cards-element.component";

@NgModule({
    declarations: [
        ModelCardsElementComponent
    ],
    exports: [
        ModelCardsElementComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
        FormsModule,
        L10nTranslationModule,
        NgbModule
    ]
})
export class SharedModule {
}
