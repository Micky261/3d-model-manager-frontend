import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";
import {FormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {L10nTranslationModule} from "angular-l10n";
import {SharedModule} from "../../shared/shared.module";
import {ProfileShowComponent} from "./profile-show.component";

@NgModule({
    declarations: [
        ProfileShowComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        RouterModule.forChild([{
            path: "",
            component: ProfileShowComponent
        }]),
        L10nTranslationModule,
        SharedModule,
    ]
})
export class ProfileShowModule {
}
