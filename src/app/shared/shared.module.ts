import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {L10nTranslationModule} from "angular-l10n";
import {CustomPipesModule} from "../core/pipes/custom-pipes.module";
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
        NgbModule,
        CustomPipesModule
    ]
})
export class SharedModule {
}
