import {Component, Inject, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {L10N_LOCALE, L10nLocale, L10nTranslationService} from "angular-l10n";
import "../../../../shared/array.extension";
import {ToastrService} from "ngx-toastr";
import {ImportService} from "../../../core/services/import.service";
import {Model} from "../../../core/types/model.type";

@Component({
    selector: "app-import-element",
    templateUrl: "./import-element.component.html",
    styleUrls: ["./import-element.component.css"]
})
export class ImportElementComponent implements OnInit {
    enabledImporters: string[];
    redirectAfterImport = true;
    importInProgress = false;
    currentImport: string;

    constructor(
        @Inject(L10N_LOCALE) public readonly locale: L10nLocale,
        private readonly importService: ImportService,
        private readonly router: Router,
        private readonly translationService: L10nTranslationService,
        private readonly toastr: ToastrService
    ) {
    }

    ngOnInit(): void {
        this.importService.getEnabledImporters().subscribe((ei: string[]) =>
            this.enabledImporters = ei
        );
    }

    importWithId(input: HTMLInputElement, importer: string): void {
        this.importInProgress = true;
        this.currentImport = importer;

        if (input.value === "")
            return;

        const id = (["thingiverse", "myminifactory", "printables"].includes(importer)) ? parseInt(input.value, 10) : input.value;

        this.importService.import(importer, {id}).subscribe({
            next: (serverModel: Model) => {
                this.importInProgress = false;

                if (this.redirectAfterImport) {
                    void this.router.navigate(["/model", serverModel.id]).then(() => true);
                } else {
                    this.toastr.success(this.translationService.translate("toast.ModelCreated", {name: serverModel.name}) as string);
                }
            },
            error: error => {
                this.importInProgress = false;
                console.log(error);
            }
        });
    }
}
