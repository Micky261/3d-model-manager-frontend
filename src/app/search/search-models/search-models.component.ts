import {Component, Inject, OnInit} from "@angular/core";
import {ActivatedRoute, Params} from "@angular/router";
import {L10N_LOCALE, L10nLocale, L10nTranslationService} from "angular-l10n";
import {SearchService} from "../../core/services/search.service";
import {TitleService} from "../../core/services/title.service";
import {Model} from "../../core/types/model.type";

@Component({
    selector: "app-search-models",
    templateUrl: "./search-models.component.html",
    styleUrls: ["./search-models.component.css"]
})
export class SearchModelsComponent implements OnInit {
    searchTerm: string;
    models: Model[];
    title = "SearchResults";
    titleParams: { searchTerm: string; count: number };

    constructor(
        @Inject(L10N_LOCALE) public readonly locale: L10nLocale,
        private readonly titleService: TitleService,
        private readonly searchService: SearchService,
        private readonly route: ActivatedRoute,
        private readonly translate: L10nTranslationService
    ) {
        this.route.queryParams.subscribe((params: Params) => {
            this.search(params.term as string);

            this.titleService.setTitle("SearchTitle", true, {term: params.term});
        });
    }

    ngOnInit(): void {
        this.search(this.route.snapshot.queryParams.term as string);
    }

    search(term: string): void {
        if (!term) term = this.translate.translate("Search");

        // TODO: Add form to select search fields
        this.searchService.searchModels(term, ["name"]).subscribe(m => {
            this.models = m;
            this.searchTerm = term;
            this.titleParams = {count: m.length, searchTerm: term};
            this.title = (m.length === 1) ? "SearchResults_ONE" : "SearchResults_MULTIPLE";
        });
    }
}
