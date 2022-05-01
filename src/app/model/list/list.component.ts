import {Component, Inject, OnInit} from "@angular/core";
import {L10N_LOCALE, L10nLocale} from "angular-l10n";
import {Model} from "../../core/types/model.type";
import {Sorting} from "../../core/types/sorting.type";

@Component({
    selector: "app-list",
    templateUrl: "./list.component.html",
    styleUrls: ["./list.component.css"]
})
export class ListComponent implements OnInit {
    sortings = Sorting.sortings;
    models: Model[];
    sorting: string = Sorting.default;

    constructor(
        @Inject(L10N_LOCALE) public readonly locale: L10nLocale
    ) {
    }

    ngOnInit(): void {
    }

}
