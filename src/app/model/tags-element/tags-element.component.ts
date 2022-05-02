import {Component, Inject, Input, OnInit, ViewChild} from "@angular/core";
import {NgSelectComponent} from "@ng-select/ng-select";
import {L10N_LOCALE, L10nLocale} from "angular-l10n";
import {ToastService} from "../../core/error/toast.service";
import {ModelTagsService} from "../../core/services/model-tags.service";
import {ModelTag} from "../../core/types/model-tag.type";

@Component({
    selector: "app-tags-element",
    templateUrl: "./tags-element.component.html",
    styleUrls: ["./tags-element.component.css"]
})
export class TagsElementComponent implements OnInit {
    modelTags: ModelTag[];
    tagsWithCount: { tag: string; count: number }[] = [];

    selectedTag: any;
    lastTagSearchTerm = "";

    @ViewChild("selectTag") selectTag: NgSelectComponent;

    @Input() modelId: number;

    constructor(
        @Inject(L10N_LOCALE) public readonly locale: L10nLocale,
        private readonly toast: ToastService,
        private readonly modelTagsService: ModelTagsService,
    ) {
    }

    ngOnInit(): void {
        this.modelTagsService.getAllTags().subscribe(t => this.tagsWithCount = t);
        this.modelTagsService.getModelTags(this.modelId).subscribe({
            next: tags => this.modelTags = tags,
            error: () => this.toast.showBackendError("TagsNotReceived")
        });
    }

    addTag(): void {
        this.setTagOnServer(this.lastTagSearchTerm);
    }

    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    setTag(event: any): void {
        if (event) {
            this.setTagOnServer(event.tag as string);
        }
    }

    saveSearch(event: { term: string; items: any[] }): void {
        this.lastTagSearchTerm = event.term;
    }

    deleteTag(tag: ModelTag): void {
        this.modelTagsService.deleteModelTag(this.modelId, tag.tag).subscribe({
            next: () => this.modelTags.remove(tag),
            error: () => this.toast.showBackendError("TagCouldNotBeDeleted")
        });
    }

    private setTagOnServer(tag: string): void {
        this.modelTagsService.postModelTag(this.modelId, tag).subscribe({
            next: serverTag => {
                if (serverTag != null) {
                    this.modelTags.push(serverTag);
                }

                this.selectedTag = null;
                this.lastTagSearchTerm = "";
                this.selectTag.handleClearClick();
            },
            error: () => this.toast.showBackendError("TagCouldNotBeSet")
        });
    }
}
