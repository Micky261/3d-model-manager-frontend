import {Component, Inject, OnInit} from "@angular/core";
import {L10N_LOCALE, L10nLocale} from "angular-l10n";
import "../../../../shared/array.extension";
import {ImportSource} from "../../../core/enums/import-source.enum";
import {ToastService} from "../../../core/error/toast.service";
import {ImportService} from "../../../core/services/import.service";
import {Model} from "../../../core/types/model.type";
import {ServerMessage} from "../../../core/types/serverMessage.type";
import {UrlMatcher} from "../../../core/utils/UrlMatcher";

@Component({
    selector: "app-multi-import-element",
    templateUrl: "./multi-import-element.component.html",
    styleUrls: ["./multi-import-element.component.css"],
    standalone: false
})
export class MultiImportElementComponent implements OnInit {
    enabledImporters: ImportSource[];
    matchingPossible: ImportSource[];
    allowedImports: ImportSource[];
    allowedImportsString: string;

    links: { url: string; importer: ImportSource; id: string }[] = [];
    progress: Map<string, { finished: boolean; name: string }> = new Map();

    toBeImportedList: { url: string; importer: ImportSource; id: string }[] = [];
    linkImportInProgress: { url: string; importer: ImportSource; id: string };

    constructor(
        @Inject(L10N_LOCALE) public readonly locale: L10nLocale,
        private readonly importService: ImportService,
        private readonly toast: ToastService
    ) {
    }

    ngOnInit(): void {
        this.matchingPossible = UrlMatcher.availableMatchers();

        this.importService.getEnabledImporters().subscribe((ei: ImportSource[]) => {
            this.enabledImporters = ei;
            this.allowedImports = this.enabledImporters.filter(is => this.matchingPossible.includes(is));
            this.allowedImportsString = this.allowedImports.map(is => is.toString()).join(", ");
        });

        setInterval(() => {
            this.permanentImportCoroutine();
        }, 500);
    }

    processImport(textarea: HTMLTextAreaElement): void {
        textarea.value.split("\n").forEach(line => {
            const result = UrlMatcher.match(line);

            if (result != null) {
                this.links.push({url: line, importer: result.importSource, id: result.id});
                this.toBeImportedList.push({url: line, importer: result.importSource, id: result.id});
            } else {
                this.toast.showValidationError("InvalidUrl");
            }
        });
    }

    permanentImportCoroutine(): void {
        if (this.linkImportInProgress == null) {
            if (this.toBeImportedList.length > 0) {
                const newLink = this.toBeImportedList.shift();
                this.linkImportInProgress = newLink;

                this.conductImport(newLink);
                this.progress.set(newLink.url, {finished: false, name: null});
            }
        }
    }

    conductImport(link: { url: string; importer: ImportSource; id: string }): void {
        this.importService.import(link.importer, {id: link.id}).subscribe({
            next: (serverModel: Model) => {
                this.progress.set(link.url, {finished: true, name: serverModel.name});
                this.linkImportInProgress = null;
            },
            error: error => {
                this.toast.showBackendError((error.error as ServerMessage).messageCode);
                this.linkImportInProgress = null;
            }
        });
    }
}
