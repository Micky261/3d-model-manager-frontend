import {Component, ElementRef, Inject, Input, OnInit, ViewChild} from "@angular/core";
import {L10N_LOCALE, L10nLocale} from "angular-l10n";
import {ToastService} from "../../core/error/toast.service";
import {ModelService} from "../../core/services/model.service";
import {Link} from "../../core/types/link.type";
import {Model} from "../../core/types/model.type";

@Component({
    selector: "app-links-element",
    templateUrl: "./links-element.component.html",
    styleUrls: ["./links-element.component.css"]
})
export class LinksElementComponent implements OnInit {
    @Input() model: Model;

    @ViewChild("inputLinkLink") inputLinkLink: ElementRef<HTMLInputElement>;
    @ViewChild("inputLinkTitle") inputLinkTitle: ElementRef<HTMLInputElement>;
    @ViewChild("inputLinkDescription") inputLinkDescription: ElementRef<HTMLTextAreaElement>;

    editLink: Link = null;
    openLinkForm = false;

    constructor(
        @Inject(L10N_LOCALE) public readonly locale: L10nLocale,
        private readonly toast: ToastService,
        private readonly modelService: ModelService,
    ) {
    }

    ngOnInit(): void {
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

    saveLink(event: Event): void {
        event.preventDefault();

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
        this.clearLinkForm();
    }

    clearLinkForm(): void {
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
            () => true,
            () => this.toast.showBackendError("ModelUpdateFailed")
        );
    }
}
