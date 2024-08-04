import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {NgbCollapse, NgbTooltipModule} from "@ng-bootstrap/ng-bootstrap";
import {L10nTranslationModule} from "angular-l10n";
import {AutosizeModule} from "ngx-autosize";
import {MarkdownModule} from "ngx-markdown";
import {CustomPipesModule} from "../../core/pipes/custom-pipes.module";
import {SharedModule} from "../../shared/shared.module";
import {ShowComponent} from "./show.component";

@NgModule({
    declarations: [
        ShowComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        RouterModule.forChild([{
            path: "",
            component: ShowComponent
        }]),
        L10nTranslationModule,
        ReactiveFormsModule,
        MarkdownModule,
        NgbTooltipModule,
        SharedModule,
        AutosizeModule,
        CustomPipesModule,
        NgbCollapse,
    ]
})
export class ShowModule {
}
