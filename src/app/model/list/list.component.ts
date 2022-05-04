import {Component, Inject, OnInit} from "@angular/core";
import {L10N_LOCALE, L10nLocale} from "angular-l10n";
import {ModelService} from "../../core/services/model.service";
import {Model} from "../../core/types/model.type";

@Component({
    selector: "app-list",
    templateUrl: "./list.component.html",
    styleUrls: ["./list.component.css"]
})
export class ListComponent implements OnInit {
    models: Model[];

    constructor(
        @Inject(L10N_LOCALE) public readonly locale: L10nLocale,
        private readonly modelService: ModelService
    ) {
    }

    ngOnInit(): void {
        this.modelService.getAllModels().subscribe(m => this.models = m);
    }
}
