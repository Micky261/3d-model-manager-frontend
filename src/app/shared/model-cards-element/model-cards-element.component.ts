import {Component, Inject, Input, OnChanges, OnInit, SimpleChanges} from "@angular/core";
import {L10N_LOCALE, L10nLocale} from "angular-l10n";
import {Observable} from "rxjs";
import {Environment} from "../../../environment";
import {AuthService} from "../../core/auth/auth.service";
import {Sorting} from "../../core/types/sorting.type";
import {ModelService} from "../../core/services/model.service";
import {Model, ModelWithTags} from "../../core/types/model.type";

@Component({
    selector: "app-model-cards-element",
    templateUrl: "./model-cards-element.component.html",
    styleUrls: ["./model-cards-element.component.css"]
})
export class ModelCardsElementComponent implements OnInit, OnChanges {
    @Input() listType: "newest" | "random" | "all" = "random";
    @Input() numberOfModels: number;
    @Input() pageSize: number;
    @Input() halfSize = false;
    models: ModelWithTags[];
    filteredModels: ModelWithTags[] = [];
    page = 1; // Pages are 1-based
    cssClasses = "row row-cols-1 justify-content-center ";

    sessionName = AuthService.sessionCookieName;
    sessionId: string;
    apiUrl = Environment.apiUrl;

    _sorting: string = Sorting.default;
    sortDesc: boolean;
    sortField: string;

    _tagFilter: string[] = [];

    @Input() set tagFilter(tags: string[]) {
        if (this.listType !== "all") throw new DOMException("tagFilter can only be used with listType==all.");
        this._tagFilter = tags;
        this.filterModels();
    }

    @Input() set sorting(s: string) {
        this._sorting = s;
        this.sortDesc = Sorting.sortingDesc.get(s);
        this.sortField = Sorting.sortingField.get(s);
    }

    constructor(
        @Inject(L10N_LOCALE) public readonly locale: L10nLocale,
        private readonly modelService: ModelService,
        private readonly authService: AuthService
    ) {
    }

    ngOnInit(): void {
        this.cssClasses += (this.halfSize)
            ? "row-cols-sm-2 row-cols-lg-3 row-cols-xxl-4"
            : "row-cols-sm-3 row-cols-md-5 row-cols-lg-6 row-cols-xl-7 row-cols-xxl-8";
        this.pageSize = (this.pageSize) ? this.pageSize : this.numberOfModels;

        this.sessionId = this.authService.getSession();

        let subscription: Observable<(Model | ModelWithTags)[]>;
        switch (this.listType) {
            case "random":
                subscription = this.modelService.getRandomModels(this.numberOfModels);
                break;
            case "all":
                subscription = this.modelService.getAllModelsWithTags();
                break;
            default:
                subscription = this.modelService.getNewestModels(this.numberOfModels);

        }

        subscription.subscribe(models => this.models = models as ModelWithTags[]);
    }

    ngOnChanges(changes: SimpleChanges) {
        this.filterModels();
    }

    private filterModels(): void {
        if (this.models) {
            if (this._tagFilter.length === 0) {
                this.filteredModels = this.models;
            } else {
                this.filteredModels = this.models.filter((model: ModelWithTags) => {
                    return model.tags != null
                        && this._tagFilter.filter(tag => !model.tags.includes(tag)).length === 0;
                });
            }
        }
    }
}
