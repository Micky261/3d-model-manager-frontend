import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";
import {FormsModule} from "@angular/forms";
import {NgbTooltip} from "@ng-bootstrap/ng-bootstrap";
import {NgSelectModule} from "@ng-select/ng-select";
import {L10nTranslationModule} from "angular-l10n";
import {CustomPipesModule} from "../../core/pipes/custom-pipes.module";
import {UploadElementComponent} from "./upload-element.component";

@NgModule({
    declarations: [
        UploadElementComponent
    ],
    imports: [
        CommonModule,
        L10nTranslationModule,
        NgSelectModule,
        FormsModule,
        CustomPipesModule,
        NgbTooltip
    ],
    exports: [
        UploadElementComponent
    ]
})
export class UploadElementModule {
}
