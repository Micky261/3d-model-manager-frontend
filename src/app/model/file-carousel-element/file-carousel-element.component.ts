import {Component, Inject, Input, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {L10N_LOCALE, L10nLocale, L10nTranslationService} from "angular-l10n";
import * as THREE from "three";
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
    threeRenderer: THREE.WebGLRenderer = new THREE.WebGLRenderer({alpha: true, antialias: true});
    threeScene: THREE.Scene = new THREE.Scene();

    @Input() modelId: number;
    sessionName = AuthService.sessionCookieName;
    sessionId: string;
    apiUrl = Environment.apiUrl;

    fileNavigation: "image" | "model" | "diagram" = "image";

    filesMap: Map<string, ModelFile[]> = new Map();
    viewableFilesMap: Map<string, ModelFile[]> = new Map();

    constructor(
        @Inject(L10N_LOCALE) public readonly locale: L10nLocale,
        private readonly translator: L10nTranslationService,
        readonly modelFilesService: ModelFilesService,
        readonly fileTypesService: FileTypesService,
        private readonly route: ActivatedRoute,
        private readonly authService: AuthService
    ) {
    }

    ngOnInit(): void {
        this.modelId = parseInt(this.route.snapshot.paramMap.get("id"), 10);
        this.sessionId = this.authService.getSession();

        this.threeRenderer.setClearColor("rgb(0,0,0)", 0);
        this.threeScene.background = null;
        this.setRendererSize();

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
                return ["3d"].includes(this.fileTypesService.getApplicationFromName(file.filename));
            });
            if (models.length > 0) {
                this.viewableFilesMap.set("model", models);
            }
        });
    }

    setRendererSize() {
        this.threeRenderer.setSize(
            window.innerWidth * ((window.innerWidth <= 768) ? 0.90 : 0.7), // Breakpoint md
            window.innerHeight * 0.49
        );
    }
}
