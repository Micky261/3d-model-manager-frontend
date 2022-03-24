import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {L10nTranslationModule} from "angular-l10n";
import {CreateFormElementComponent} from "./create-form-element/create-form-element.component";
import {CreateModelComponent} from "./create-model.component";

@NgModule({
    declarations: [
        CreateModelComponent,
        CreateFormElementComponent,
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
    ]
})
export class CreateModelModule {
}
