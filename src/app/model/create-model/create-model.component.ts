import {Component, Inject, OnInit} from "@angular/core";
import {L10N_LOCALE, L10nLocale} from "angular-l10n";

@Component({
    selector: "app-create-model",
    templateUrl: "./create-model.component.html",
    styleUrls: ["./create-model.component.css"]
})
export class CreateModelComponent implements OnInit {
    constructor(
        @Inject(L10N_LOCALE) public locale: L10nLocale
    ) {
    }

    ngOnInit(): void {
    }

}
