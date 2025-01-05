import {HttpErrorResponse} from "@angular/common/http";
import {Component, ElementRef, Inject, Input, OnInit, ViewChild} from "@angular/core";
import {L10N_LOCALE, L10nLocale} from "angular-l10n";
import "../../../shared/array.extension";
import {ModelType, modelTypesMap} from "../../core/enums/model-types.enum";
import {ToastService} from "../../core/error/toast.service";
import {ModelFilesService} from "../../core/services/model-files.service";
import {ServerMessage} from "../../core/types/serverMessage.type";

@Component({
    selector: "app-upload-element",
    templateUrl: "./upload-element.component.html",
    styleUrls: ["./upload-element.component.css"]
})
export class UploadElementComponent implements OnInit {
    modelTypesMap = modelTypesMap;

    @Input() modelId: number;

    files: { name: string; type: string }[] = [];
    selectedFileType: string = modelTypesMap.get(ModelType.Model);
    forceOverwrite: boolean = false;

    progress: Map<string, { current: number; total: number }> = new Map();
    progressReadable: Map<string, number> = new Map();

    @ViewChild("dragDrop") dragDrop: ElementRef<HTMLDivElement>;

    // current upload
    filesToUploadList: { file: File; type: string }[] = [];
    fileUploadInProgress: { file: File; name: string; type: string };

    constructor(
        @Inject(L10N_LOCALE) public readonly locale: L10nLocale,
        private readonly toast: ToastService,
        private readonly modelFilesService: ModelFilesService
    ) {
    }

    ngOnInit(): void {
        setInterval(() => {
            this.permanentUploadCoroutine();
        }, 500);
    }

    queueFiles(event: any, source: "drop" | "input"): void {
        event.preventDefault();
        event.stopPropagation();

        let files: FileList;
        if (source === "drop") {
            files = event.dataTransfer.files;
        } else {
            files = event.target.files;
        }

        for (let i = 0; i < files.length; i++) {
            this.files.push({name: files.item(i).name, type: this.selectedFileType});
            this.filesToUploadList.push({file: files.item(i), type: this.selectedFileType});
            this.progressReadable.set(files.item(i).name, 0);
        }
    }

    permanentUploadCoroutine(): void {
        if (this.fileUploadInProgress == null) {
            if (this.filesToUploadList.length > 0) {
                const newFile = this.filesToUploadList.shift();
                this.fileUploadInProgress = {file: newFile.file, name: newFile.file.name, type: newFile.type};

                const progress = {current: 0, total: 0};
                this.conductUpload(this.fileUploadInProgress, progress);
                this.progress.set(this.fileUploadInProgress.name, progress);
            } // else do nothing
        } else {
            const n = this.fileUploadInProgress.name;
            const p = this.progress.get(n);
            this.progressReadable.set(n, ((p.current) / p.total) * 100);
        }
    }

    conductUpload(file: { file: File; name: string; type: string }, progress: { current: number; total: number }): void {

        void this.modelFilesService.putFile(this.modelId, file.file, file.type, this.forceOverwrite, progress).then(
            () => {
                this.progress.delete(file.name);
                this.progressReadable.set(file.name, 100);
                this.fileUploadInProgress = null;
            },
            (error: HttpErrorResponse) =>
                this.toast.showBackendError((JSON.parse(error.error as string) as ServerMessage).messageCode)
        );
    }

    onDragOver(event: Event): void {
        event.preventDefault();
        event.stopPropagation();
        this.dragDrop.nativeElement.style.opacity = "0.6";
    }

    onDragLeave(event: Event): void {
        event.preventDefault();
        event.stopPropagation();
        this.dragDrop.nativeElement.style.opacity = "1";
    }
}
