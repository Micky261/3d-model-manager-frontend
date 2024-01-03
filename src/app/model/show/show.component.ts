import {Component, ElementRef, Inject, OnInit, ViewChild} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {L10N_LOCALE, L10nLocale, L10nTranslationService} from "angular-l10n";
import "../../../shared/array.extension";
import "../../../shared/string.extension";
import {ToastrService} from "ngx-toastr";
import {EditModes} from "../../core/enums/edit-modes.enum";
import {ToastService} from "../../core/error/toast.service";
import {ModelFilesService} from "../../core/services/model-files.service";
import {ModelService} from "../../core/services/model.service";
import {Model} from "../../core/types/model.type";
import {DownloadHelper} from "../../core/utils/DownloadHelper";

@Component({
    selector: "app-show",
    templateUrl: "./show.component.html",
    styleUrls: ["./show.component.css"]
})
export class ShowComponent implements OnInit {
    EditModes = EditModes;

    modelId: number;
    model: Model;

    @ViewChild("inputName") inputName: ElementRef<HTMLInputElement>;
    @ViewChild("inputAuthor") inputAuthor: ElementRef<HTMLInputElement>;
    @ViewChild("saved") saved: ElementRef<HTMLSpanElement>;

    editName = false;
    editAuthor = false;

    navigation: "description" | "importedDescription" | "notes" | "links" | "files" | "fileViewer" = "description";
    editMode: EditModes = EditModes.OnlyView;
    uploadMode = false;

    constructor(
        @Inject(L10N_LOCALE) public readonly locale: L10nLocale,
        private readonly translator: L10nTranslationService,
        private readonly toast: ToastService,
        private readonly toastr: ToastrService,
        private readonly modelService: ModelService,
        private readonly modelFilesService: ModelFilesService,
        private readonly route: ActivatedRoute,
        private readonly router: Router,
        readonly modalService: NgbModal
    ) {
    }

    ngOnInit(): void {
        this.modelId = parseInt(this.route.snapshot.paramMap.get("id"), 10);

        this.modelService.getModel(this.modelId).subscribe({
            next: (m: Model) => this.model = m,
            error: () => void this.router.navigate(["static", "not-found"]).then(() => true)
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
            case EditModes.SplitView:
                this.editMode = EditModes.OnlyView;
                break;
            case EditModes.OnlyEdit:
                this.editMode = EditModes.SplitView;
                break;
            case EditModes.OnlyView:
                this.editMode = EditModes.OnlyEdit;
                break;
        }

        this.saved.nativeElement.textContent = (this.editMode === EditModes.OnlyView) ? "" :
            this.translator.translate("ChangesAutomaticallySaved");
    }

    saveText(e: Event | number): void {
        void this.modelService.updateModel(this.model).subscribe({
            next: () => {
                if (typeof e != "number") {
                    this.saved.nativeElement.textContent = this.translator.translate("Saved");
                    setTimeout(() => {
                        this.saved.nativeElement.textContent = "";
                    }, 3000);
                }
            },
            error: () => this.toast.showBackendError("ModelUpdateFailed")
        });
    }

    downloadZip(type: string): void {
        this.modelFilesService.getZip(this.modelId, type).subscribe(response => {
            const blob = new Blob([response.body], {type: "application/octet-stream"});
            DownloadHelper.download(blob, `${this.model.name} - ${type}.zip`);
        });
    }

    deleteModel() {
        this.modelService.deleteModel(this.model.id).subscribe((model: Model) => {
            void this.toastr.success(this.translator.translate("toast.ModelDeleted", model) as string);
            void this.router.navigate(["model", "list"]).then(() => true);
        });
    }

    private updateModelOnServer(): void {
        void this.modelService.updateModel(this.model).subscribe({
            next: () => true,
            error: () => this.toast.showBackendError("ModelUpdateFailed")
        });
    }

    getInputStyle(input: HTMLInputElement) {
        const screenMultiplierMin = (screen.width < 768) ? 0.5 : 0.2;
        const screenMultiplierMax = (screen.width < 768) ? 0.85 : 0.5;

        return {
            "min-width": (screenMultiplierMin * screen.width).toString() + "px",
            "width": (input.value.length * 10).toString() + "px",
            "max-width": (screenMultiplierMax * screen.width).toString() + "px",
        };
    }
}
