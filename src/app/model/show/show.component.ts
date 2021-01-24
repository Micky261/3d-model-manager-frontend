import {Component, ElementRef, Inject, OnInit, ViewChild} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {L10N_LOCALE, L10nLocale, L10nTranslationService} from "angular-l10n";
import {PDFSource} from "ng2-pdf-viewer";
import "../../../shared/array.extension";
import "../../../shared/string.extension";
import {AuthService} from "../../core/auth/auth.service";
import {ToastService} from "../../core/error/toast.service";
import {FileTypesService} from "../../core/file-types.service";
import {ModelFilesService} from "../../core/model-files.service";
import {ModelService} from "../../core/model.service";
import {ModelFile} from "../../core/types/model-file.type";
import {Model} from "../../core/types/model.type";

@Component({
    selector: "app-show",
    templateUrl: "./show.component.html",
    styleUrls: ["./show.component.css"]
})
export class ShowComponent implements OnInit {
    modelId: number;
    model: Model;

    @ViewChild("inputName") inputName: ElementRef<HTMLInputElement>;
    @ViewChild("inputAuthor") inputAuthor: ElementRef<HTMLInputElement>;
    @ViewChild("saved") saved: ElementRef<HTMLSpanElement>;

    editName = false;
    editAuthor = false;

    navigation: "description" | "imported_description" | "notes" | "links" = "description";
    editMode: "onlyEdit" | "onlyView" | "splitView" = "onlyView";
    fileNavigation: "image" | "model" | "diagram" = "image"; // TODO: image
    uploadMode = false;

    filesMap: Map<string, ModelFile[]> = new Map();
    viewableFilesMap: Map<string, ModelFile[]> = new Map();

    constructor(
        @Inject(L10N_LOCALE) public locale: L10nLocale,
        private readonly translator: L10nTranslationService,
        private readonly toast: ToastService,
        private readonly modelService: ModelService,
        readonly modelFilesService: ModelFilesService,
        readonly fileTypesService: FileTypesService,
        private readonly route: ActivatedRoute,
        private readonly router: Router
    ) {
        this.modelId = parseInt(this.route.snapshot.paramMap.get("id"), 10);
    }

    ngOnInit(): void {
        this.modelService.getModel(this.modelId).subscribe((m: Model) => {
            this.model = m;
        }, () => {
            void this.router.navigate(["static", "not-found"]).then(() => true);
        });

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

    changeFavorite(): void {
        this.model.favorite = !this.model.favorite;
        this.updateModelOnServer();
    }

    updateField(input: HTMLInputElement, field: string): void {
        switch (field) {
            case "name": {
                this.model.name = input.value;
                this.editName = false;
                break;
            }
            case "author": {
                this.model.author = input.value;
                this.editAuthor = false;
                break;
            }
        }

        this.updateModelOnServer();
    }

    toggleField(field: string): void {
        switch (field) {
            case "name": {
                this.editName = !this.editName;
                if (this.editName) {
                    setTimeout(() => {
                        this.inputName.nativeElement.focus();
                    }, 0);
                }
                break;
            }
            case "author": {
                this.editAuthor = !this.editAuthor;
                if (this.editAuthor) {
                    setTimeout(() => {
                        this.inputAuthor.nativeElement.focus();
                    }, 0);
                }
                break;
            }
        }
    }

    switchEditMode(): void {
        switch (this.editMode) {
            case "splitView":
                this.editMode = "onlyView";
                break;
            case "onlyEdit":
                this.editMode = "splitView";
                break;
            case "onlyView":
                this.editMode = "onlyEdit";
                break;
        }

        if (this.editMode !== "onlyView") {
            this.saved.nativeElement.textContent = this.translator.translate("ChangesAutomaticallySaved");
        }
    }

    saveText(e: Event | number): void {
        void this.modelService.updateModel(this.model).subscribe(
            () => {
                if (typeof e != "number") {
                    this.saved.nativeElement.textContent = this.translator.translate("Saved");
                    setTimeout(() => {
                        this.saved.nativeElement.textContent = "";
                    }, 3000);
                }
            },
            () => this.toast.showBackendError("ModelUpdateFailed")
        );
    }

    // eslint-disable-next-line @typescript-eslint/naming-convention
    getAuthLink(modelId: number, type: string, filename: string): PDFSource {
        return {
            url: this.modelFilesService.getFileUrl(modelId, type, filename),
            // eslint-disable-next-line @typescript-eslint/naming-convention
            httpHeaders: {Authorization: `Bearer ${localStorage.getItem(AuthService.localStorageTokenKey)}`}
        };
    }

    private updateModelOnServer(): void {
        void this.modelService.updateModel(this.model).subscribe(
            () => true,
            () => this.toast.showBackendError("ModelUpdateFailed")
        );
    }
}
