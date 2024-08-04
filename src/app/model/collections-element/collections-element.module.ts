import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {NgSelectModule} from "@ng-select/ng-select";
import {L10nTranslationModule} from "angular-l10n";
import {CustomPipesModule} from "../../core/pipes/custom-pipes.module";
import {CollectionsElementComponent} from "./collections-element.component";

@NgModule({
    declarations: [
        CollectionsElementComponent
    ],
    imports: [
        CommonModule,
        NgSelectModule,
        L10nTranslationModule,
        CustomPipesModule,
        RouterModule,
    ],
    exports: [
        CollectionsElementComponent
    ]
})
export class CollectionsElementModule {
}
