import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {L10nTranslationModule} from "angular-l10n";
import {NotFoundComponent} from "./not-found.component";

@NgModule({
    declarations: [NotFoundComponent],
    imports: [
        CommonModule,
        RouterModule.forChild([{
            path: "",
            component: NotFoundComponent
        }]),
        L10nTranslationModule,
    ]
})
export class NotFoundModule {
}
