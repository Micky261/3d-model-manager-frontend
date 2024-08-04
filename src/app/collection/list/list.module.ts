import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {NgbCollapse} from "@ng-bootstrap/ng-bootstrap";
import {L10nTranslationModule} from "angular-l10n";
import {CustomPipesModule} from "../../core/pipes/custom-pipes.module";
import {SharedModule} from "../../shared/shared.module";
import {ListComponent} from "./list.component";

@NgModule({
    declarations: [
        ListComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild([{
            path: "",
            component: ListComponent
        }]),
        L10nTranslationModule,
        SharedModule,
        CustomPipesModule,
        ReactiveFormsModule,
        FormsModule,
        NgbCollapse
    ]
})
export class ListModule {
}
