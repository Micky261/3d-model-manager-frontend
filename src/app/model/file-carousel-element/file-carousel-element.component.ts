import {Component, Inject, Input, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {L10N_LOCALE, L10nLocale, L10nTranslationService} from "angular-l10n";
import {Subject} from "rxjs";
import {Environment} from "../../../environment";
import {AuthService} from "../../core/auth/auth.service";
import {FileTypesService} from "../../core/services/file-types.service";
import {ModelFilesService} from "../../core/services/model-files.service";
import {ModelFile} from "../../core/types/model-file.type";

@Component({
    selector: "file-carousel-element",
    templateUrl: "./file-carousel-element.component.html",
    styleUrls: ["./file-carousel-element.component.css"]
})
export class FileCarouselElementComponent implements OnInit {
    @Input() modelId: number;
    sessionName = AuthService.sessionCookieName;
    sessionId: string;
    apiUrl = this.environment.apiUrl();

    fileNavigation: "image" | "model" | "diagram" = "image";

    filesMap: Map<string, ModelFile[]> = new Map();
    viewableFilesMap: Map<string, ModelFile[]> = new Map();

    carouselActivationSubject: Subject<void> = new Subject<void>();

    constructor(
        @Inject(L10N_LOCALE) public readonly locale: L10nLocale,
        private readonly translator: L10nTranslationService,
        readonly modelFilesService: ModelFilesService,
        readonly fileTypesService: FileTypesService,
        private readonly route: ActivatedRoute,
        private readonly authService: AuthService,
        private readonly environment: Environment
    ) {
    }

    ngOnInit(): void {
        this.modelId = parseInt(this.route.snapshot.paramMap.get("id"), 10);
        this.sessionId = this.authService.getSession();

        this.modelFilesService.getFilesWithType(this.modelId, "image").subscribe((imageFiles: ModelFile[]) => {
            this.filesMap.set("image", imageFiles);

            const images = imageFiles.filter(file => {
                return ["video", "pdf", "image"].includes(this.fileTypesService.getApplicationFromName(file.filename));
            });
            if (images.length > 0) {
                this.viewableFilesMap.set("image", images);
            }
        });

        this.modelFilesService.getFilesWithType(this.modelId, "diagram").subscribe((diagramFiles: ModelFile[]) => {
            this.filesMap.set("diagram", diagramFiles);

            const diagrams = diagramFiles.filter(file => {
                return ["video", "pdf", "image"].includes(this.fileTypesService.getApplicationFromName(file.filename));
            });
            if (diagrams.length > 0) {
                this.viewableFilesMap.set("diagram", diagrams);
            }
        });

        this.modelFilesService.getFilesWithType(this.modelId, "model").subscribe((modelFiles: ModelFile[]) => {
            this.filesMap.set("model", modelFiles);

            const models = modelFiles.filter(file => {
                return ["model"].includes(this.fileTypesService.getApplicationFromName(file.filename));
            });
            if (models.length > 0) {
                this.viewableFilesMap.set("model", models);
            }
        });

        this.modelFilesService.getFilesWithType(this.modelId, "document").subscribe((pdfFiles: ModelFile[]) => {
            this.filesMap.set("pdf", pdfFiles);

            const pdfs = pdfFiles.filter(file => {
                return ["pdf"].includes(this.fileTypesService.getApplicationFromName(file.filename));
            });
            if (pdfs.length > 0) {
                this.viewableFilesMap.set("pdf", pdfs);
            }
        });
    }
}
