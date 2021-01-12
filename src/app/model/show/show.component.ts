import {Component, ElementRef, Inject, OnInit, ViewChild} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {L10N_LOCALE, L10nLocale} from "angular-l10n";
import "../../../shared/array.extension";
import "../../../shared/string.extension";
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
    @ViewChild("inputLinkLink") inputLinkLink: ElementRef<HTMLInputElement>;
    @ViewChild("inputLinkTitle") inputLinkTitle: ElementRef<HTMLInputElement>;
    @ViewChild("inputLinkDescription") inputLinkDescription: ElementRef<HTMLTextAreaElement>;

    editName = false;
    editAuthor = false;
    editLink: Link = null;

    navigation = "description";
    openLinkForm = false;

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

    preFillEditLinkForm(link: Link): void {
        this.openLinkForm = true;
        setTimeout(() => {
            this.inputLinkTitle.nativeElement.value = link.title;
            this.inputLinkLink.nativeElement.value = link.link;
            this.inputLinkDescription.nativeElement.value = link.description;

            this.editLink = link;

            this.inputLinkLink.nativeElement.focus();
        }, 5);
    }

    saveLink(): void {
        const lT = this.inputLinkTitle.nativeElement.value;
        const lL = this.inputLinkLink.nativeElement.value;
        const lD = this.inputLinkDescription.nativeElement.value;

        if (this.editLink != null) {
            this.editLink.title = lT;
            this.editLink.link = lL;
            this.editLink.description = lD;
        } else {
            this.model.links.push(new Link(lT, lT, lD));
        }

        this.updateModelOnServer();
        this.inputLinkTitle.nativeElement.value = "";
        this.inputLinkLink.nativeElement.value = "";
        this.inputLinkDescription.nativeElement.value = "";
        this.editLink = null;
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
