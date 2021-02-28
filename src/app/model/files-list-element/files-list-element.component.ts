import {Component, Inject, Input, OnInit} from "@angular/core";
import {L10N_LOCALE, L10nLocale} from "angular-l10n";
import {ModelFilesService} from "../../core/services/model-files.service";
import {ModelFile} from "../../core/types/model-file.type";

@Component({
    selector: "app-files-list-element",
    templateUrl: "./files-list-element.component.html",
    styleUrls: ["./files-list-element.component.css"]
})
export class FilesListElementComponent implements OnInit {
    @Input() modelId: number;

    files: ModelFile[] = [];
    lastSaved: number;

    constructor(
        @Inject(L10N_LOCALE) public locale: L10nLocale,
        private readonly modelFilesService: ModelFilesService,
    ) {
    }

    ngOnInit(): void {
        this.modelFilesService.getFiles(this.modelId).subscribe(files => this.files = files);
    }

    saveFileList(): void {
        this.modelFilesService.updateFiles(this.modelId, this.files).subscribe(() =>
            this.lastSaved = Date.now()
        );
    }
}
