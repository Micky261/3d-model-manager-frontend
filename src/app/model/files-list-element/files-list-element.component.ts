import {Component, ElementRef, Inject, Input, OnInit, ViewChild} from "@angular/core";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {L10N_LOCALE, L10nLocale} from "angular-l10n";
import "../../../shared/array.extension";
import {modelTypesMap} from "../../core/enums/model-types.enum";
import {ToastService} from "../../core/error/toast.service";
import {ModelFilesService} from "../../core/services/model-files.service";
import {ModelFile} from "../../core/types/model-file.type";
import {ServerMessage} from "../../core/types/serverMessage.type";
import {DownloadHelper} from "../../core/utils/DownloadHelper";

@Component({
    selector: "app-files-list-element",
    templateUrl: "./files-list-element.component.html",
    styleUrls: ["./files-list-element.component.css"],
    standalone: false
})
export class FilesListElementComponent implements OnInit {
    modelTypesMap = modelTypesMap;

    @Input() modelId: number;

    files: ModelFile[] = [];
    selectedFiles: ModelFile[] = [];
    lastSaved: number;
    fileForDeletion: ModelFile;

    sortFields: string[] = [];
    sortDirections: boolean[] = [];

    @ViewChild("checkAllCheckbox", {static: false}) checkAllCheckbox: ElementRef<HTMLInputElement>;

    constructor(
        @Inject(L10N_LOCALE) public readonly locale: L10nLocale,
        private readonly modelFilesService: ModelFilesService,
        private readonly toast: ToastService,
        public readonly modalService: NgbModal
    ) {
    }

    ngOnInit(): void {
        this.refreshList();

        this.changeSortFields("type");
        this.changeSortFields("position");
        this.changeSortFields("filename");
    }

    saveFileList(): void {
        this.modelFilesService.updateFiles(this.modelId, this.files).subscribe({
            next: files => {
                this.files = files;
                this.lastSaved = Date.now();
            },
            error: error => {
                const sMsg = error.error as ServerMessage;
                this.toast.showBackendError(sMsg.messageCode);
            }
        });
    }

    downloadFile(file: ModelFile): void {
        this.modelFilesService.getFile(file.id).subscribe({
            next: response => {
                const blob = new Blob([response.body], {type: response.headers.get("Content-Type")});

                DownloadHelper.download(blob, file.filename);
            },
            error: error => {
                const sMsg = error.error as ServerMessage;
                this.toast.showBackendError(sMsg.messageCode);
            }
        });
    }

    deleteFile(): void {
        this.modelFilesService.deleteFile(this.fileForDeletion.id).subscribe(() => {
            this.toast.showSuccess("FileDeleted");
            this.files.remove(this.fileForDeletion);
            this.fileForDeletion = undefined;
        });
    }

    refreshList(): void {
        this.modelFilesService.getFiles(this.modelId).subscribe(files => {
            this.files = files;
            this.selectedFiles = [];
        });
    }

    changeSortFields(field: string): void {
        if (this.sortFields.includes(field)) {
            const idx = this.sortFields.indexOf(field);
            this.sortFields.remove(field);
            this.sortDirections.removeAt(idx);
        } else {
            this.sortFields.push(field);
            this.sortDirections.push(false);
        }
    }

    changeSortDir(field: string): void {
        const idx = this.sortFields.indexOf(field);
        this.sortDirections[idx] = !this.sortDirections[idx];
    }

    checkAll(checkAllCheckbox: HTMLInputElement): void {
        this.selectedFiles = (checkAllCheckbox.checked) ? Array.from(this.files) : [];
    }

    public onChangeSelect(submissionId: ModelFile, selected: HTMLInputElement): void {
        if (selected.checked) {
            if (!this.selectedFiles.includes(submissionId)) {
                this.selectedFiles.push(submissionId);
            }
            this.checkAllCheckbox.nativeElement.checked = this.selectedFiles.length === this.files.length;
        } else {
            this.selectedFiles.remove(submissionId);
            this.checkAllCheckbox.nativeElement.checked = false;
        }
    }
}
