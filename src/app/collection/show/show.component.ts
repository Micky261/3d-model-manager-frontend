import {Component, ElementRef, Inject, OnInit, ViewChild} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {L10N_LOCALE, L10nLocale, L10nTranslationService} from "angular-l10n";
import "../../../shared/array.extension";
import "../../../shared/string.extension";
import {ToastrService} from "ngx-toastr";
import {ToastService} from "../../core/error/toast.service";
import {CollectionService} from "../../core/services/collection.service";
import {Collection} from "../../core/types/collection.type";
import {Model} from "../../core/types/model.type";
import {Sorting} from "../../core/types/sorting.type";

@Component({
    selector: "app-collection-show",
    templateUrl: "./show.component.html",
    styleUrls: ["./show.component.css"]
})
export class ShowComponent implements OnInit {
    Sorting = Sorting;

    collectionId: number;
    collection: Collection;
    modelsInCollection: Model[];
    copyModelIdsInCollection: number[];

    @ViewChild("inputName") inputName: ElementRef<HTMLInputElement>;
    @ViewChild("saved") saved: ElementRef<HTMLSpanElement>;

    collapseDescription = false;

    editName = false;
    editCollection = false;

    constructor(
        @Inject(L10N_LOCALE) public readonly locale: L10nLocale,
        private readonly translator: L10nTranslationService,
        private readonly route: ActivatedRoute,
        private readonly router: Router,
        private readonly toast: ToastService,
        private readonly toastr: ToastrService,
        private readonly collectionService: CollectionService,
        readonly modalService: NgbModal
    ) {
    }

    ngOnInit(): void {
        this.collectionId = parseInt(this.route.snapshot.paramMap.get("id"), 10);

        this.collectionService.getCollection(this.collectionId).subscribe({
            next: (collection: Collection) => this.collection = collection,
            error: () => void this.router.navigate(["static", "not-found"]).then(() => true)
        });

        this.collectionService.getModelsInCollection(this.collectionId).subscribe((models: Model[]) => {
            this.modelsInCollection = models;
            this.copyModelIdsInCollection = models.map(model => model.id);
        });
    }

    saveCollection(): void {
        void this.collectionService.updateCollection(this.collectionId, this.collection).subscribe({
            next: () => true,
            error: () => this.toast.showBackendError("CollectionUpdateFailed")
        });

        const removedModelIds = this.copyModelIdsInCollection.returnAllRemoved(
            this.modelsInCollection.map(model => model.id)
        );

        removedModelIds.forEach((modelId) => {
            void this.collectionService.deleteRelation(this.collectionId, modelId).subscribe({
                next: () => true,
                error: () => this.toast.showBackendError("CollectionUpdateFailed")
            });
        });

        this.editCollection = false;
    }

    handleCollectionEditEvent(event: { event: "delete" | "setMain"; modelId: number }): void {
        switch (event.event) {
            case "setMain":
                this.collection.mainModel = event.modelId;
                break;
            case "delete":
                this.modelsInCollection.remove(
                    this.modelsInCollection.find(model => model.id === event.modelId)
                );
                break;
        }
    }

    getInputStyle(input: HTMLInputElement) {
        const screenMultiplierMin = (screen.width < 768) ? 0.5 : 0.2;
        const screenMultiplierMax = (screen.width < 768) ? 0.85 : 0.5;

        return {
            "min-width": (screenMultiplierMin * screen.width).toString() + "px",
            "width": (input.value.length * 10).toString() + "px",
            "max-width": (screenMultiplierMax * screen.width).toString() + "px",
        };
    }

    deleteCollection(): void {
        this.collectionService.deleteCollection(this.collection.id).subscribe((collection: Collection) => {
            void this.toastr.success(this.translator.translate("toast.CollectionDeleted", collection) as string);
            void this.router.navigate(["collection", "list"]).then(() => true);
        });
    }
}
