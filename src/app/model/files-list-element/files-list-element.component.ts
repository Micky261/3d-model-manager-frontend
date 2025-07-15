import {Component, ElementRef, Inject, Input, OnInit, ViewChild} from "@angular/core";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {L10N_LOCALE, L10nLocale, L10nTranslationService} from "angular-l10n";
import {ToastrService} from "ngx-toastr";
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
        private readonly toastr: ToastrService,
        private readonly translation: L10nTranslationService,
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

                if (sMsg.additionalInformation) {
                    const oldType = sMsg.additionalInformation[0];
                    const oldTypeName = this.translation.translate("filetype." + oldType) as string;
                    const newType = sMsg.additionalInformation[1];
                    const newTypeName = this.translation.translate("filetype." + newType) as string;
                    const filename = sMsg.additionalInformation[2];

                    const change = this.translation.translate("ProblematicFile") as string;
                    this.toastr.info("" + oldTypeName + " -> " + newTypeName + "<br/>" + filename, change, {enableHtml: true});
                }
            }
        });
    }

    downloadFile(file: ModelFile): void {
        this.modelFilesService.getFile(file.id).subscribe({
            next: response => {
                console.log(response.headers.get("Content-Type"));
                const blob = new Blob([response.body], {type: response.headers.get("Content-Type")});

                DownloadHelper.download(blob, file.filename);
            },
            error: error => {
                const sMsg = error.error as ServerMessage;
                this.toast.showBackendError(sMsg.messageCode);

                if (sMsg.additionalInformation) {
                    const type = sMsg.additionalInformation[0];
                    const typeName = this.translation.translate("filetype." + type) as string;
                    const filename = sMsg.additionalInformation[1];

                    const change = this.translation.translate("ProblematicFile") as string;
                    this.toastr.info(`${filename} (${typeName})`, change, {enableHtml: true});
                }
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
