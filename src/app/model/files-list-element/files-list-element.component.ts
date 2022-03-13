import {Component, Inject, Input, OnInit} from "@angular/core";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {L10N_LOCALE, L10nLocale, L10nTranslationService} from "angular-l10n";
import {ToastrService} from "ngx-toastr";
import "../../../shared/array.extension";
import {ToastService} from "../../core/error/toast.service";
import {ModelFilesService} from "../../core/services/model-files.service";
import {ModelFile} from "../../core/types/model-file.type";
import {ServerMessage} from "../../core/types/serverMessage.type";

@Component({
    selector: "app-files-list-element",
    templateUrl: "./files-list-element.component.html",
    styleUrls: ["./files-list-element.component.css"]
})
export class FilesListElementComponent implements OnInit {
    @Input() modelId: number;

    files: ModelFile[] = [];
    lastSaved: number;
    fileForDeletion: ModelFile;

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
        this.modelFilesService.getFiles(this.modelId).subscribe(files => this.files = files);
    }

    saveFileList(): void {
        this.modelFilesService.updateFiles(this.modelId, this.files).subscribe(
            files => {
                this.files = files;
                this.lastSaved = Date.now();
            },
            error => {
                const sMsg = error.error as ServerMessage;
                this.toast.showBackendError(sMsg.message_code);

                if (sMsg.additional_information) {
                    const oldType = sMsg.additional_information[0];
                    const oldTypeName = this.translation.translate("filetype." + oldType) as string;
                    const newType = sMsg.additional_information[1];
                    const newTypeName = this.translation.translate("filetype." + newType) as string;
                    const filename = sMsg.additional_information[2];

                    const change = this.translation.translate("ProblematicFile") as string;
                    this.toastr.info("" + oldTypeName + " -> " + newTypeName + "<br/>" + filename, change, {enableHtml: true});
                }
            }
        );
    }

    downloadFile(file: ModelFile): void {
        this.modelFilesService.getFile(file.model_id, file.type, file.filename).subscribe(
            data => {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
                const blob = new Blob([data]);
                const url = window.URL.createObjectURL(blob);
                window.open(url);
            },
            error => {
                const sMsg = error.error as ServerMessage;
                this.toast.showBackendError(sMsg.message_code);

                if (sMsg.additional_information) {
                    const type = sMsg.additional_information[0];
                    const typeName = this.translation.translate("filetype." + type) as string;
                    const filename = sMsg.additional_information[1];

                    const change = this.translation.translate("ProblematicFile") as string;
                    this.toastr.info(`${filename} (${typeName})`, change, {enableHtml: true});
                }
            }
        );
    }

    deleteFile(): void {
        this.modelFilesService.deleteFile(this.fileForDeletion.model_id, this.fileForDeletion.type, this.fileForDeletion.filename).subscribe(() => {
            this.toast.showSuccess("FileDeleted");
            this.files.remove(this.fileForDeletion);
            this.fileForDeletion = undefined;
        });
    }
}
