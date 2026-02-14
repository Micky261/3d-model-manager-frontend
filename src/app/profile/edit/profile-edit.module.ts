import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {L10nTranslationModule} from "angular-l10n";
import {ProfileEditComponent} from "./profile-edit.component";

@NgModule({
    declarations: [
        ProfileEditComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forChild([{
            path: "",
            component: ProfileEditComponent
        }]),
        L10nTranslationModule,
    ]
})
export class ProfileEditModule {
}
