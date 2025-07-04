import {Component, Inject, OnInit} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {L10N_LOCALE, L10nLocale} from "angular-l10n";
import "../../../shared/array.extension";
import {ModelTagsService} from "../../core/services/model-tags.service";
import {ModelService} from "../../core/services/model.service";
import {TitleService} from "../../core/services/title.service";
import {ModelWithTags} from "../../core/types/model.type";
import {Sorting} from "../../core/types/sorting.type";

@Component({
    selector: "app-tag-list",
    templateUrl: "./tag-list.component.html",
    styleUrls: ["./tag-list.component.css"],
    standalone: false
})
export class TagListComponent implements OnInit {
    sortings = Sorting.sortingsTags;
    sorting: string = Sorting.defaultTag;

    tagsWithCount: { tag: string; count: number }[] = [];
    tagFilter: string[] = [];

    tagSort = ["count", "tag"];
    tagDesc = [true, false];

    models: ModelWithTags[];
    filteredModels: ModelWithTags[];

    constructor(
        @Inject(L10N_LOCALE) public readonly locale: L10nLocale,
        private readonly titleService: TitleService,
        private readonly modelService: ModelService,
        private readonly modelTagsService: ModelTagsService,
        private readonly route: ActivatedRoute,
        private readonly router: Router
    ) {
        this.titleService.setTitle("Tags", true);
    }

    ngOnInit(): void {
        const quTags = this.route.snapshot.queryParams.tags;
        if (quTags) {
            this.tagFilter = quTags.split(",");
            this.titleService.setTitle("TagsTitleWithName", true, {tags: this.tagFilter.join(", ")});
        }

        this.modelService.getAllModelsWithTags().subscribe(models => {
            this.models = models;
            this.filteredModels = models;
            this.filterModels();
        });

        this.modelTagsService.getAllTags().subscribe(t => this.tagsWithCount = t);
    }

    addTagFilter(tag: string): void {
        if (!this.tagFilter.includes(tag)) {
            this.tagFilter.push(tag);
            this.filterModels();
            this.navigateFilter();
        }
    }

    removeTagFilter(tag: string): void {
        if (this.tagFilter.includes(tag)) {
            this.tagFilter.remove(tag);
            this.filterModels();
            this.navigateFilter();
        }
    }

    navigateFilter(): void {
        void this.router.navigate(
            ["/tags/list"],
            (this.tagFilter.length > 0) ? {queryParams: {tags: this.tagFilter.join(",")}} : {}
        ).then(() =>
            this.titleService.setTitle("TagsTitleWithName", true, {tags: this.tagFilter.join(", ")}));
    }

    sortTags(/*event: Event*/) {
        switch (this.sorting) {
            case "CountAsc":
            case "CountDesc":
                this.tagSort = [Sorting.sortingField.get(this.sorting), Sorting.sortingField.get("TagAsc")];
                this.tagDesc = [Sorting.sortingDesc.get(this.sorting), Sorting.sortingDesc.get("TagAsc")];
                break;
            case "TagAsc":
            case "TagDesc":
                this.tagSort = [Sorting.sortingField.get(this.sorting)];
                this.tagDesc = [Sorting.sortingDesc.get(this.sorting)];
                break;
            default:
                throw new DOMException("Impossible state.");
        }
    }

    private filterModels(): void {
        if (this.models && this.tagFilter) {
            this.filteredModels = this.models.filter((model: ModelWithTags) => {
                return model.tags != null
                    && this.tagFilter.filter(tag => !model.tags.includes(tag)).length === 0;
            });
        }
    }
}
