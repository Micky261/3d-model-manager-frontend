import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";
import {FormsModule} from "@angular/forms";
import {NgSelectModule} from "@ng-select/ng-select";
import {L10nTranslationModule} from "angular-l10n";
import {UploadElementComponent} from "./upload-element.component";

@NgModule({
    declarations: [
        UploadElementComponent
    ],
    imports: [
        CommonModule,
        L10nTranslationModule,
        NgSelectModule,
        FormsModule
    ],
    exports: [
        UploadElementComponent
    ]
})
export class UploadElementModule {
}
