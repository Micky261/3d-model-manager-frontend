import {Component, ElementRef, Inject, Input, OnInit, ViewChild} from "@angular/core";
import {L10N_LOCALE, L10nLocale} from "angular-l10n";
import "../../../shared/array.extension";
import {ToastService} from "../../core/error/toast.service";
import {ModelFilesService} from "../../core/services/model-files.service";

@Component({
    selector: "app-upload-element",
    templateUrl: "./upload-element.component.html",
    styleUrls: ["./upload-element.component.css"]
})
export class UploadElementComponent implements OnInit {
    @Input() modelId: number;

    files: any = [];
    selectedFileType: "model" | "image" | "diagram" | "document" = "model";

    progress: Map<string, { current: number; total: number }> = new Map();

    @ViewChild("dragDrop") dragDrop: ElementRef<HTMLDivElement>;

    constructor(
        @Inject(L10N_LOCALE) public locale: L10nLocale,
        private readonly toast: ToastService,
        private readonly modelFilesService: ModelFilesService
    ) {
    }

    ngOnInit(): void {
    }

    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    uploadFile(event: any, source: "drop" | "input"): void {
        event.preventDefault();
        event.stopPropagation();

        let files: FileList;
        if (source === "drop") {
            files = event.dataTransfer.files;
        } else {
            files = event.target.files;
        }

        for (let i = 0; i < files.length; i++) {
            const name = files.item(i).name;

            this.progress.set(name, {current: 0, total: 0});
            void this.modelFilesService.putFile(this.modelId, files.item(i), this.selectedFileType, this.progress.get(name)).then(() => this.files.push(name));
        }
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
