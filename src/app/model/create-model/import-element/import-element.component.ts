import {Component, Inject, OnInit} from "@angular/core";
import {L10N_LOCALE, L10nLocale} from "angular-l10n";
import "../../../../shared/array.extension";
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
        const id = (["thingiverse", "myminifactory"].includes(importer)) ? parseInt(input.value, 10) : input.value;

        this.importService.import(importer, {id}).subscribe(data => {
            console.log(data);
        });
    }
}
