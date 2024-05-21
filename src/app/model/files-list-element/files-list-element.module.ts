import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";
import {FormsModule} from "@angular/forms";
import {NgbTooltip} from "@ng-bootstrap/ng-bootstrap";
import {NgSelectModule} from "@ng-select/ng-select";
import {L10nTranslationModule} from "angular-l10n";
import {CustomPipesModule} from "../../core/pipes/custom-pipes.module";
import {FilesListElementComponent} from "./files-list-element.component";

@NgModule({
    declarations: [
        FilesListElementComponent
    ],
    imports: [
        CommonModule,
        L10nTranslationModule,
        CustomPipesModule,
        FormsModule,
        NgSelectModule,
        NgbTooltip,
    ],
    exports: [
        FilesListElementComponent
    ],
})
export class FilesListElementModule {
}
