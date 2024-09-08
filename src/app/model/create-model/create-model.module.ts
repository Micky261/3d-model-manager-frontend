import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {NgbTooltip} from "@ng-bootstrap/ng-bootstrap";
import {L10nTranslationModule} from "angular-l10n";
import {CreateFormElementComponent} from "./create-form-element/create-form-element.component";
import {CreateModelComponent} from "./create-model.component";
import {ImportElementComponent} from "./import-element/import-element.component";
import {MultiImportElementComponent} from "./multi-import-element/multi-import-element.component";

@NgModule({
    declarations: [
        CreateModelComponent,
        CreateFormElementComponent,
        ImportElementComponent,
        MultiImportElementComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        RouterModule.forChild([{
            path: "",
            component: CreateModelComponent
        }]),
        L10nTranslationModule,
        ReactiveFormsModule,
        NgbTooltip,
    ]
})
export class CreateModelModule {
}
