import {Component, Inject, Input, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {L10N_LOCALE, L10nLocale, L10nTranslationService} from "angular-l10n";
import {PDFSource} from "ng2-pdf-viewer";
import {AuthService} from "../../core/auth/auth.service";
import {FileTypesService} from "../../core/file-types.service";
import {ModelFilesService} from "../../core/model-files.service";
import {ModelFile} from "../../core/types/model-file.type";

@Component({
    selector: "file-carousel-element",
    templateUrl: "./file-carousel-element.component.html",
    styleUrls: ["./file-carousel-element.component.css"]
})
export class FileCarouselElementComponent implements OnInit {
    @Input() modelId: number;

    fileNavigation: "image" | "model" | "diagram" = "image";

    filesMap: Map<string, ModelFile[]> = new Map();
    viewableFilesMap: Map<string, ModelFile[]> = new Map();

    constructor(
        @Inject(L10N_LOCALE) public locale: L10nLocale,
        private readonly translator: L10nTranslationService,
        readonly modelFilesService: ModelFilesService,
        readonly fileTypesService: FileTypesService,
        private readonly route: ActivatedRoute
    ) {
    }

    ngOnInit(): void {
        this.modelId = parseInt(this.route.snapshot.paramMap.get("id"), 10);

        this.modelFilesService.getFiles(this.modelId, "image").subscribe(imageFiles => {
            this.filesMap.set("image", imageFiles);
            this.viewableFilesMap.set("image", imageFiles.filter(file => {
                return ["video", "pdf", "image"].includes(this.fileTypesService.getApplicationFromName(file.filename));
            }));
        });

        this.modelFilesService.getFiles(this.modelId, "diagram").subscribe(imageFiles => {
            this.filesMap.set("diagram", imageFiles);
            this.viewableFilesMap.set("diagram", imageFiles.filter(file => {
                return ["video", "pdf", "image"].includes(this.fileTypesService.getApplicationFromName(file.filename));
            }));
        });
    }

    // eslint-disable-next-line @typescript-eslint/naming-convention
    getAuthLink(modelId: number, type: string, filename: string): PDFSource {
        return {
            url: this.modelFilesService.getFileUrl(modelId, type, filename),
            // eslint-disable-next-line @typescript-eslint/naming-convention
            httpHeaders: {Authorization: `Bearer ${localStorage.getItem(AuthService.localStorageTokenKey)}`}
        };
    }
}
