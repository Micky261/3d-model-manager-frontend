import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {NgSelectModule} from "@ng-select/ng-select";
import {L10nTranslationModule} from "angular-l10n";
import {CustomPipesModule} from "../../core/pipes/custom-pipes.module";
import {TagsElementComponent} from "./tags-element.component";

@NgModule({
    declarations: [
        TagsElementComponent
    ],
    imports: [
        CommonModule,
        NgSelectModule,
        L10nTranslationModule,
        CustomPipesModule,
        RouterModule,
    ],
    exports: [
        TagsElementComponent
    ]
})
export class TagsElementModule {
}
