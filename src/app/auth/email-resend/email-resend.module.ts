import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";
import {FormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {L10nTranslationModule} from "angular-l10n";
import {EmailResendComponent} from "./email-resend.component";

@NgModule({
    declarations: [
        EmailResendComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        RouterModule.forChild([{
            path: "",
            component: EmailResendComponent
        }]),
        L10nTranslationModule,
    ]
})
export class EmailResendModule {
}
