import {Component, Inject, Input, OnInit} from "@angular/core";
import {L10N_LOCALE, L10nLocale} from "angular-l10n";
import "../../../shared/array.extension";
import {ToastService} from "../../core/error/toast.service";
import {ModelFilesService} from "../../core/model-files.service";

@Component({
    selector: "app-upload-element",
    templateUrl: "./upload-element.component.html",
    styleUrls: ["./upload-element.component.css"]
})
export class UploadElementComponent implements OnInit {
    @Input() modelId: number;

    files: any = [];
    selectedFileType: "image" | "model" | "diagram" | "document" = "image";

    progress: Map<string, { current: number; total: number }> = new Map();

    constructor(
        @Inject(L10N_LOCALE) public locale: L10nLocale,
        private readonly toast: ToastService,
        private readonly modelFilesService: ModelFilesService
    ) {
    }

    ngOnInit(): void {
    }

    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    uploadFile(event: any): void {
        const files: FileList = event.target.files;
        for (let i = 0; i < files.length; i++) {
            const filename = files.item(i).name;

            this.files.push(filename);

            this.progress.set(filename,  { current: 0, total: 0 });
            void this.modelFilesService.putFile(this.modelId, files.item(i), this.selectedFileType, this.progress.get(filename)).then();
        }
    }

    onDragOver(event: Event): void {
        event.preventDefault();
        event.stopPropagation();
    }

    public onDragLeave(event: Event): void {
        event.preventDefault();
        event.stopPropagation();
    }
}
