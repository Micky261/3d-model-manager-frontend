import {Component, Inject, OnInit} from "@angular/core";
import {FormBuilder, Validators} from "@angular/forms";
import {L10N_LOCALE, L10nLocale} from "angular-l10n";
import {urlValidator} from "../../../../shared/form-validators";
import {ImportService} from "../../../core/services/import.service";

@Component({
    selector: "app-import-element",
    templateUrl: "./import-element.component.html",
    styleUrls: ["./import-element.component.css"]
})
export class ImportElementComponent implements OnInit {
    enabledImporters: string[];

    constructor(
        @Inject(L10N_LOCALE) public readonly locale: L10nLocale,
        private readonly importService: ImportService
    ) {
    }

    ngOnInit(): void {
        this.importService.getEnabledImporters().subscribe((ei: string[]) =>
            this.enabledImporters = ei
        );
    }

    importWithId(input: HTMLInputElement, importer: string): void {
        const id = parseInt(input.value, 10);

        this.importService.import(importer, {"id": id}).subscribe(data => {
            console.log(data);
        });
    }
}
