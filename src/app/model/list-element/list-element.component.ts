import {Component, Inject, Input, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {L10N_LOCALE, L10nLocale} from "angular-l10n";
import {Model} from "../../core/types/model.type";
import {Sorting} from "../../core/types/sorting.type";

@Component({
    selector: "app-list-element",
    templateUrl: "./list-element.component.html",
    styleUrls: ["./list-element.component.css"]
})
export class ListElementComponent implements OnInit {
    sortings = Sorting.sortingsModel;
    sorting: string = Sorting.defaultModel;

    @Input() title = "Models";
    @Input() tagFilter: string[] = [];

    constructor(
        @Inject(L10N_LOCALE) public readonly locale: L10nLocale
    ) {
    }

    ngOnInit(): void {
    }
}
