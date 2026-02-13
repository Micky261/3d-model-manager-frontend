import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {L10nTranslationModule} from "angular-l10n";
import {EmailVerifyComponent} from "./email-verify.component";

@NgModule({
    declarations: [
        EmailVerifyComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild([{
            path: ":token",
            component: EmailVerifyComponent
        }]),
        L10nTranslationModule,
    ]
})
export class EmailVerifyModule {
}
