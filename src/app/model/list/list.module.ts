import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {L10nTranslationModule} from "angular-l10n";
import {SharedModule} from "../../shared/shared.module";
import {ListComponent} from "./list.component";

@NgModule({
    declarations: [
        ListComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild([{
            path: "",
            component: ListComponent
        }]),
        L10nTranslationModule,
        SharedModule
    ]
})
export class ListModule {
}
