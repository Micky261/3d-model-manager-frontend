import {Component, Inject, OnInit} from "@angular/core";
import {L10N_LOCALE, L10nLocale} from "angular-l10n";
import {TitleService} from "../../core/services/title.service";

@Component({
    selector: "app-create-model",
    templateUrl: "./create-model.component.html",
    styleUrls: ["./create-model.component.css"],
    standalone: false
})
export class CreateModelComponent implements OnInit {
    creationMethod: string;

    constructor(
        @Inject(L10N_LOCALE) public readonly locale: L10nLocale,
        private readonly titleService: TitleService,
    ) {
        this.titleService.setTitle("CreateModel", true);
    }

    ngOnInit(): void {
    }
}
