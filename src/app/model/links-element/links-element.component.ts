import {Component, ElementRef, Inject, Input, OnInit, ViewChild} from "@angular/core";
import {L10N_LOCALE, L10nLocale} from "angular-l10n";
import {ModelLinksService} from "../../core/services/model-links.service";
import {ModelLink} from "../../core/types/model-link.type";
import {Model} from "../../core/types/model.type";

@Component({
    selector: "app-links-element",
    templateUrl: "./links-element.component.html",
    styleUrls: ["./links-element.component.css"],
    standalone: false
})
export class LinksElementComponent implements OnInit {
    @Input() model: Model;

    @ViewChild("inputLinkLink") inputLinkLink: ElementRef<HTMLInputElement>;
    @ViewChild("inputLinkTitle") inputLinkTitle: ElementRef<HTMLInputElement>;
    @ViewChild("inputLinkDescription") inputLinkDescription: ElementRef<HTMLTextAreaElement>;

    editLink: ModelLink = null;
    openLinkForm = false;

    constructor(
        @Inject(L10N_LOCALE) public readonly locale: L10nLocale,
        private readonly modelLinksService: ModelLinksService,
    ) {
    }

    ngOnInit(): void {
    }

    preFillEditLinkForm(link: ModelLink): void {
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

            this.modelLinksService.updateModelLink(this.editLink.id, this.editLink).subscribe(
                () => this.clearLinkForm()
            );
        } else {
            const newModelLink = new ModelLink(undefined, undefined, this.model.id, lT, lL, lD, 1, undefined, undefined);

            this.modelLinksService.addModelLink(this.model.id, newModelLink).subscribe(
                (ml: ModelLink) => {
                    this.model.links.push(ml);
                    this.clearLinkForm();
                }
            );
        }
    }

    clearLinkForm(): void {
        this.inputLinkTitle.nativeElement.value = "";
        this.inputLinkLink.nativeElement.value = "";
        this.inputLinkDescription.nativeElement.value = "";
        this.editLink = null;
    }

    deleteLink(link: ModelLink): void {
        this.modelLinksService.deleteModelTag(link.id).subscribe(
            () => this.model.links.remove(link)
        );
    }
}
