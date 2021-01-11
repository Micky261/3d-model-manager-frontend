import {Component, ElementRef, Inject, OnInit, ViewChild} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {NgSelectComponent} from "@ng-select/ng-select";
import {L10N_LOCALE, L10nLocale} from "angular-l10n";
import {ToastService} from "../../core/error/toast.service";
import {ModelTagsService} from "../../core/model-tags.service";
import {ModelService} from "../../core/model.service";
import {ModelTag} from "../../core/types/model-tag.type";
import {Model} from "../../core/types/model.type";

@Component({
    selector: "app-show",
    templateUrl: "./show.component.html",
    styleUrls: ["./show.component.css"]
})
export class ShowComponent implements OnInit {
    modelId: number;
    model: Model;
    modelTags: ModelTag[];

    tagsWithCount: { tag: string; count: number }[] = [];

    @ViewChild("selectTag") selectTag: NgSelectComponent;
    @ViewChild("inputName") inputName: ElementRef<HTMLInputElement>;
    editName = false;
    selectedTag: any;
    lastTagSearchTerm = "";

    constructor(
        @Inject(L10N_LOCALE) public locale: L10nLocale,
        private readonly toast: ToastService,
        private readonly modelService: ModelService,
        private readonly modelTagsService: ModelTagsService,
        private readonly route: ActivatedRoute,
        private readonly router: Router
    ) {
        this.modelId = parseInt(this.route.snapshot.paramMap.get("id"), 10);
    }

    ngOnInit(): void {
        this.modelService.getModel(this.modelId).subscribe((m: Model) => {
            this.model = m;
        }, () => {
            void this.router.navigateByUrl("/not-found").then(() => true);
        });

        this.modelTagsService.getAllTags().subscribe(t => this.tagsWithCount = t);
        this.modelTagsService.getModelTags(this.modelId).subscribe(
            tags => this.modelTags = tags,
            () => this.toast.showBackendError("TagsNotReceived")
        );
    }

    changeFavorite(): void {
        this.model.favorite = !this.model.favorite;
        this.updateModelOnServer();
    }

    updateField(input: HTMLInputElement, field: string): void {
        switch (field) {
            case "name": {
                this.model.name = input.value;
                this.editName = false;
            }
        }

        this.updateModelOnServer();
    }

    toggleField(field: string): void {
        switch (field) {
            case "name": {
                this.editName = !this.editName;
                if (this.editName) {
                    setTimeout(() => {
                        this.inputName.nativeElement.focus();
                    }, 0);
                }
            }
        }
    }

    addTag(): void {
        this.setTagOnServer(this.lastTagSearchTerm);
    }

    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    setTag(event: any): void {
        if (event) {
            this.setTagOnServer(event.tag);
        }
    }

    saveSearch(event: { term: string; items: any[] }): void {
        this.lastTagSearchTerm = event.term;
    }

    private updateModelOnServer(): void {
        void this.modelService.updateModel(this.model).subscribe(
            model => this.model = model,
            () => this.toast.showBackendError("ModelUpdateFailed")
        );
    }

    private setTagOnServer(tag: string): void {
        this.modelTagsService.postModelTag(this.modelId, tag).subscribe(
            serverTag => {
                if (serverTag != null) {
                    this.modelTags.push(serverTag);
                }

                this.selectedTag = null;
                this.lastTagSearchTerm = "";
                this.selectTag.handleClearClick();
            },
            () => this.toast.showBackendError("TagCouldNotBeSet")
        );
    }
}
