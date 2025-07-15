import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";
import {FormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {NgbModule, NgbPaginationModule} from "@ng-bootstrap/ng-bootstrap";
import {L10nTranslationModule} from "angular-l10n";
import {CustomPipesModule} from "../core/pipes/custom-pipes.module";
import {CollectionCardElementComponent} from "./collection-card-element/collection-card-element.component";
import {ListElementComponent} from "./list-element/list-element.component";
import {ModelCardElementComponent} from "./model-card-element/model-card-element.component";

@NgModule({
    declarations: [
        CollectionCardElementComponent,
        ModelCardElementComponent,
        ListElementComponent
    ],
    exports: [
        CollectionCardElementComponent,
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
