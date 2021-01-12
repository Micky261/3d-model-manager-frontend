import {Component, ElementRef, Inject, OnInit, ViewChild} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {L10N_LOCALE, L10nLocale} from "angular-l10n";
import "../../../shared/array.extension";
import {ToastService} from "../../core/error/toast.service";
import {ModelService} from "../../core/model.service";
import {Link} from "../../core/types/link.type";
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

    editName = false;
    editAuthor = false;

    navigation = "description";

    constructor(
        @Inject(L10N_LOCALE) public locale: L10nLocale,
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
            void this.router.navigateByUrl("/not-found").then(() => true);
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

    deleteLink(link: Link): void {
        this.model.links.remove(link);
        this.updateModelOnServer();
    }

    private updateModelOnServer(): void {
        void this.modelService.updateModel(this.model).subscribe(
            model => this.model = model,
            () => this.toast.showBackendError("ModelUpdateFailed")
        );
    }
}
