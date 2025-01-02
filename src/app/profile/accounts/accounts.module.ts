import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";
import {FormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {L10nTranslationModule} from "angular-l10n";
import {AccountsComponent} from "./accounts.component";

@NgModule({
    declarations: [
        AccountsComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        RouterModule.forChild([{
            path: "",
            component: AccountsComponent
        }]),
        L10nTranslationModule,
    ]
})
export class AccountsModule {
}
