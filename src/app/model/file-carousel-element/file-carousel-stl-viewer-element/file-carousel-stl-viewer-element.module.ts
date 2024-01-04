import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";
import {L10nTranslationModule} from "angular-l10n";
import {StlModelViewerModule} from "angular-stl-model-viewer";
import {FileCarouselStlViewerElementComponent} from "./file-carousel-stl-viewer-element.component";

@NgModule({
    declarations: [
        FileCarouselStlViewerElementComponent,
    ],
    imports: [
        CommonModule,
        L10nTranslationModule,
        StlModelViewerModule
    ],
    exports: [
        FileCarouselStlViewerElementComponent,
    ]
})
export class FileCarouselStlViewerElementModule {
}
