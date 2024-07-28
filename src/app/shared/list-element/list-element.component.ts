import {Component, Inject, Input, OnChanges, OnInit} from "@angular/core";
import {L10N_LOCALE, L10nLocale} from "angular-l10n";
import {Model, ModelWithTags} from "../../core/types/model.type";
import {Sorting} from "../../core/types/sorting.type";

/**
 * Must be used with following CSS classes: card text-center
 * e.g.
 * ```<app-model-card-element class="card text-center"></> ```
 */
@Component({
    selector: "app-list-element",
    templateUrl: "./list-element.component.html",
    styleUrls: ["./list-element.component.css"]
})
export class ListElementComponent implements OnInit, OnChanges {
    @Input() sortable = false;
    sortings = Sorting.sortingsModel;
    sorting: string = Sorting.defaultModel;
    sortDesc: boolean;
    sortField: string;

    @Input() header: string;
    @Input() headerParams: { searchTerm: string; count: number };
    @Input() models: (Model | ModelWithTags)[];

    @Input() deactivatePagination = false;
    @Input() pageSize = 24;
    @Input() halfSize = false;

    page = 1; // Pages are 1-based
    cssClasses = "row row-cols-1 justify-content-center ";

    constructor(
        @Inject(L10N_LOCALE) public readonly locale: L10nLocale
    ) {
    }

    ngOnInit(): void {
        this.cssClasses += (this.halfSize)
            ? "row-cols-sm-2 row-cols-lg-3 row-cols-xxl-4"
            : "row-cols-sm-3 row-cols-md-5 row-cols-lg-6 row-cols-xl-7 row-cols-xxl-8";
        this.changeSorting();
    }

    changeSorting() {
        this.sortDesc = Sorting.sortingDesc.get(this.sorting);
        this.sortField = Sorting.sortingField.get(this.sorting);
    }

    ngOnChanges(/*changes: SimpleChanges*/): void {
        this.changeSorting();
    }
}
