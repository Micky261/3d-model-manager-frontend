import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";
import {FormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {L10nTranslationModule} from "angular-l10n";
import {InvitationTokensComponent} from "./invitation-tokens.component";

@NgModule({
    declarations: [
        InvitationTokensComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        RouterModule.forChild([{
            path: "",
            component: InvitationTokensComponent
        }]),
        L10nTranslationModule,
    ]
})
export class InvitationTokensModule {
}
