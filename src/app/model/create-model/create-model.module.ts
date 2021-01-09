import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {L10nTranslationModule} from "angular-l10n";
import {CreateModelComponent} from "./create-model.component";

@NgModule({
    declarations: [
        CreateModelComponent
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
