import {Component, ElementRef, Inject, OnInit, ViewChild} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {L10N_LOCALE, L10nLocale, L10nTranslationService} from "angular-l10n";
import "../../../shared/array.extension";
import "../../../shared/string.extension";
import {ToastService} from "../../core/error/toast.service";
import {ModelService} from "../../core/model.service";
import {Model} from "../../core/types/model.type";

@Component({
    selector: "app-show",
    templateUrl: "./show.component.html",
    styleUrls: ["./show.component.css"]
})
export class ShowComponent implements OnInit {
    modelId: number;
    model: Model;

    @ViewChild("inputName") inputName: ElementRef<HTMLInputElement>;
    @ViewChild("inputAuthor") inputAuthor: ElementRef<HTMLInputElement>;
    @ViewChild("saved") saved: ElementRef<HTMLSpanElement>;

    editName = false;
    editAuthor = false;

    navigation: "description" | "imported_description" | "notes" | "links" = "description";
    editMode: "onlyEdit" | "onlyView" | "splitView" = "onlyView";
    uploadMode = false;

    constructor(
        @Inject(L10N_LOCALE) public locale: L10nLocale,
        private readonly translator: L10nTranslationService,
        private readonly toast: ToastService,
        private readonly modelService: ModelService,
        private readonly route: ActivatedRoute,
        private readonly router: Router
    ) {
        this.modelId = parseInt(this.route.snapshot.paramMap.get("id"), 10);
    }

    ngOnInit(): void {
        this.modelService.getModel(this.modelId).subscribe((m: Model) => {
            this.model = m;
        }, () => {
            void this.router.navigate(["static", "not-found"]).then(() => true);
        });
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
                break;
            }
            case "author": {
                this.model.author = input.value;
                this.editAuthor = false;
                break;
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
                break;
            }
            case "author": {
                this.editAuthor = !this.editAuthor;
                if (this.editAuthor) {
                    setTimeout(() => {
                        this.inputAuthor.nativeElement.focus();
                    }, 0);
                }
                break;
            }
        }
    }

    private updateModelOnServer(): void {
        void this.modelService.updateModel(this.model).subscribe(
            () => true,
            () => this.toast.showBackendError("ModelUpdateFailed")
        );
    }

    switchEditMode(): void {
        switch (this.editMode) {
            case "splitView": this.editMode = "onlyView"; break;
            case "onlyEdit": this.editMode = "splitView"; break;
            case "onlyView": this.editMode = "onlyEdit"; break;
        }

        if (this.editMode !== "onlyView") {
            this.saved.nativeElement.textContent = this.translator.translate("ChangesAutomaticallySaved");
        }
    }

    saveText(e: Event | number) :void{
        void this.modelService.updateModel(this.model).subscribe(
            () => {
                if (typeof e != "number") {
                    this.saved.nativeElement.textContent = this.translator.translate("Saved");
                    setTimeout(() => {
                        this.saved.nativeElement.textContent = "";
                    }, 3000);
                }
            },
            () => this.toast.showBackendError("ModelUpdateFailed")
        );
    }
}
