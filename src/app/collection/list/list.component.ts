import {Component, Inject, OnChanges, OnInit} from "@angular/core";
import {FormBuilder, Validators} from "@angular/forms";
import {L10N_LOCALE, L10nLocale} from "angular-l10n";
import {ToastService} from "../../core/error/toast.service";
import {CollectionService} from "../../core/services/collection.service";
import {TitleService} from "../../core/services/title.service";
import {Collection} from "../../core/types/collection.type";
import {Sorting} from "../../core/types/sorting.type";

@Component({
    selector: "app-collection-list",
    templateUrl: "./list.component.html",
    styleUrls: ["./list.component.css"],
    standalone: false
})
export class ListComponent implements OnInit, OnChanges {
    collections: Collection[];

    sortings = Sorting.sortingsCollection;
    sorting: string = Sorting.defaultCollection;
    sortDesc: boolean;
    sortField: string;

    page = 1; // Pages are 1-based
    pageSize = 24;

    collapseForm = true;

    createCollectionForm = new FormBuilder().group({
        name: ["", [Validators.required]],
        description: [""],
    });

    constructor(
        @Inject(L10N_LOCALE) public readonly locale: L10nLocale,
        private readonly titleService: TitleService,
        private readonly collectionService: CollectionService,
        private readonly toast: ToastService,
    ) {
        this.titleService.setTitle("Collections", true);
    }

    ngOnInit(): void {
        this.collectionService.getCollections().subscribe(collections => this.collections = collections);

        this.changeSorting();
    }

    ngOnChanges(/*changes: SimpleChanges*/): void {
        this.changeSorting();
    }

    changeSorting() {
        this.sortDesc = Sorting.sortingDesc.get(this.sorting);
        this.sortField = Sorting.sortingField.get(this.sorting);
    }

    createCollection() {
        if (!this.createCollectionForm.get("name").valid) {
            this.toast.showValidationError("EnterName");
            return;
        }

        const collection = new Collection(
            undefined,
            undefined,
            this.createCollectionForm.get("name").value,
            this.createCollectionForm.get("description").value,
            null
        );

        this.collectionService.createCollection(collection).subscribe({
            next: (resultCollection: Collection) => {
                this.toast.showSuccess("CollectionCreated", resultCollection);
                this.collections.push(resultCollection);
                this.createCollectionForm.reset({name: "", description: ""});
            },
            error: error => {
                console.log(error);
            }
        });
    }
}
