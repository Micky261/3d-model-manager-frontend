import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {L10nTranslationModule} from "angular-l10n";
import {CustomPipesModule} from "../../core/pipes/custom-pipes.module";
import {SharedModule} from "../../shared/shared.module";
import {ListElementComponent} from "./list-element.component";

@NgModule({
    declarations: [
        ListElementComponent
    ],
    exports: [
        ListElementComponent
    ],
    imports: [
        CommonModule,
        L10nTranslationModule,
        FormsModule,
        CustomPipesModule,
        SharedModule
    ]
})
export class ListElementModule {
}
