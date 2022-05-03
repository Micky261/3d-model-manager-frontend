import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";
import {FormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {NgbTooltipModule} from "@ng-bootstrap/ng-bootstrap";
import {L10nTranslationModule} from "angular-l10n";
import {CustomPipesModule} from "../../core/pipes/custom-pipes.module";
import {ListElementModule} from "../../model/list-element/list-element.module";
import {TagListComponent} from "./tag-list.component";

@NgModule({
    declarations: [
        TagListComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild([{
            path: "",
            component: TagListComponent
        }]),
        L10nTranslationModule,
        ListElementModule,
        CustomPipesModule,
        NgbTooltipModule,
        FormsModule,
    ]
})
export class TagListModule {
}
