import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {L10nTranslationModule} from "angular-l10n";
import {ShowComponent} from "./show.component";

@NgModule({
    declarations: [
        ShowComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        RouterModule.forChild([{
            path: "",
            component: ShowComponent
        }]),
        L10nTranslationModule,
        ReactiveFormsModule,
    ]
})
export class ShowModule {
}
