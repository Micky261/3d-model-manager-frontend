import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";
import {NgbCarouselModule} from "@ng-bootstrap/ng-bootstrap";
import {L10nTranslationModule} from "angular-l10n";
import {PdfViewerModule} from "ng2-pdf-viewer";
import {CustomPipesModule} from "../../core/pipes/custom-pipes.module";
import {FileCarouselElementComponent} from "./file-carousel-element.component";

@NgModule({
    declarations: [
        FileCarouselElementComponent
    ],
    imports: [
        CommonModule,
        L10nTranslationModule,
        NgbCarouselModule,
        CustomPipesModule,
        PdfViewerModule
    ], exports: [
        FileCarouselElementComponent
    ]
})
export class FileCarouselElementModule {
}
