import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {NgbModule, NgbPaginationModule} from "@ng-bootstrap/ng-bootstrap";
import {L10nTranslationModule} from "angular-l10n";
import {CustomPipesModule} from "../core/pipes/custom-pipes.module";
import {ListElementComponent} from "./list-element/list-element.component";
import {ModelCardElementComponent} from "./model-card-element/model-card-element.component";

@NgModule({
    declarations: [
        ModelCardElementComponent,
        ListElementComponent
    ],
    exports: [
        ModelCardElementComponent,
        ListElementComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
        FormsModule,
        L10nTranslationModule,
        NgbModule,
        CustomPipesModule,
        NgbPaginationModule
    ]
})
export class SharedModule {
}
