import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {L10nTranslationModule} from "angular-l10n";
import {SharedModule} from "../../shared/shared.module";
import {SearchModelsComponent} from "./search-models.component";

@NgModule({
    declarations: [
        SearchModelsComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild([{
            path: "",
            component: SearchModelsComponent
        }]),
        SharedModule,
        L10nTranslationModule,
    ]
})
export class SearchModelsModule {
}
