import {Component, Inject, OnInit} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {L10N_LOCALE, L10nLocale} from "angular-l10n";
import {ModelTagsService} from "../../core/services/model-tags.service";
import {ModelTag} from "../../core/types/model-tag.type";
import "../../../shared/array.extension";

@Component({
    selector: "app-tag-list",
    templateUrl: "./tag-list.component.html",
    styleUrls: ["./tag-list.component.css"]
})
export class TagListComponent implements OnInit {
    modelTags: ModelTag[];
    tagsWithCount: { tag: string; count: number }[] = [];
    tagFilter: string[] = [];

    constructor(
        @Inject(L10N_LOCALE) public readonly locale: L10nLocale,
        private readonly modelTagsService: ModelTagsService,
        private readonly route: ActivatedRoute,
        private readonly router: Router
    ) {
    }

    ngOnInit(): void {
        const quTags = this.route.snapshot.queryParams.tags;
        if (quTags) this.tagFilter = quTags.split(",");

        this.modelTagsService.getAllTags().subscribe(t => this.tagsWithCount = t);
    }

    addTagFilter(tag: string): void {
        if (!this.tagFilter.includes(tag)) {
            this.tagFilter.push(tag);
            this.navigateFilter();
        }
    }

    removeTagFilter(tag: string): void {
        if (this.tagFilter.includes(tag)) {
            this.tagFilter.remove(tag);
            this.navigateFilter();
        }
    }

    navigateFilter(): void {
        void this.router.navigate(
            ["/tags/list"],
            (this.tagFilter.length > 0) ? {queryParams: {tags: this.tagFilter.join(",")}} : {}
        ).then(() => true);
    }
}
