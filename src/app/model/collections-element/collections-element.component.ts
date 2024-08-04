import {Component, Inject, Input, OnInit, ViewChild} from "@angular/core";
import {NgSelectComponent} from "@ng-select/ng-select";
import {L10N_LOCALE, L10nLocale} from "angular-l10n";
import {ToastService} from "../../core/error/toast.service";
import {CollectionService} from "../../core/services/collection.service";
import {Collection} from "../../core/types/collection.type";

@Component({
    selector: "app-collections-element",
    templateUrl: "./collections-element.component.html",
    styleUrls: ["./collections-element.component.css"]
})
export class CollectionsElementComponent implements OnInit {
    collections: Collection[];
    collectionsOfModel: Collection[];

    lastCollectionSearchTerm = "";

    @ViewChild("selectCollection") selectCollection: NgSelectComponent;

    @Input() modelId: number;

    constructor(
        @Inject(L10N_LOCALE) public readonly locale: L10nLocale,
        private readonly toast: ToastService,
        private readonly collectionService: CollectionService,
    ) {
    }

    ngOnInit(): void {
        this.collectionService.getCollections().subscribe(c => this.collections = c);
        this.collectionService.getCollectionsOfModel(this.modelId).subscribe({
            next: com => this.collectionsOfModel = com,
            error: () => this.toast.showBackendError("CollectionsNotReceived")
        });
    }

    saveSearch(event: { term: string; items: any[] }): void {
        this.lastCollectionSearchTerm = event.term;
    }

    deleteRelation(collection: Collection): void {
        this.collectionService.deleteRelation(collection.id, this.modelId).subscribe({
            next: () => this.collectionsOfModel.remove(collection),
            error: () => this.toast.showBackendError("CollectionCouldNotBeDeleted")
        });
    }

    createRelation(collection: Collection): void {
        if (collection) {
            this.collectionService.createRelation(collection.id, this.modelId).subscribe({
                next: () => {
                    this.collectionsOfModel.push(collection);
                    this.lastCollectionSearchTerm = "";
                    this.selectCollection.handleClearClick();
                },
                error: () => this.toast.showBackendError("CollectionCouldNotBeSet")
            });
        }
    }
}
