import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";
import {L10nTranslationModule} from "angular-l10n";
import {UploadElementComponent} from "./upload-element.component";

@NgModule({
    declarations: [
        UploadElementComponent
    ],
    imports: [
        CommonModule,
        L10nTranslationModule
    ],
    exports: [
        UploadElementComponent
    ]
})
export class UploadElementModule {
}
