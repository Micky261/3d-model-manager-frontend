import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {L10nTranslationModule} from "angular-l10n";
import {PasswordResetComponent} from "./password-reset.component";

@NgModule({
    declarations: [
        PasswordResetComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forChild([{
            path: ":token",
            component: PasswordResetComponent
        }]),
        L10nTranslationModule,
    ]
})
export class PasswordResetModule {
}
