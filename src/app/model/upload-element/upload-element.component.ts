import {Component, Inject, OnInit} from "@angular/core";
import {L10N_LOCALE, L10nLocale} from "angular-l10n";
import "../../../shared/array.extension";
import {ToastService} from "../../core/error/toast.service";

@Component({
    selector: "app-upload-element",
    templateUrl: "./upload-element.component.html",
    styleUrls: ["./upload-element.component.css"]
})
export class UploadElementComponent implements OnInit {
    files: any = [];

    constructor(
        @Inject(L10N_LOCALE) public locale: L10nLocale,
        private readonly toast: ToastService
    ) {
    }

    ngOnInit(): void {
    }

    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    uploadFile(event: any): void {
        const files: FileList = event.target.files;
        for (let i = 0; i < files.length; i++) this.files.push(files.item(i).name);
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
