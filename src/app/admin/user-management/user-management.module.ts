import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";
import {FormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {L10nTranslationModule} from "angular-l10n";
import {CustomPipesModule} from "../../core/pipes/custom-pipes.module";
import {UserManagementComponent} from "./user-management.component";

@NgModule({
    declarations: [
        UserManagementComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        RouterModule.forChild([{
            path: "",
            component: UserManagementComponent
        }]),
        L10nTranslationModule,
        CustomPipesModule,
    ]
})
export class UserManagementModule {
}
