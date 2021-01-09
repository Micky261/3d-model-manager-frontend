import {Component, Inject, OnInit} from "@angular/core";
import {L10N_LOCALE, L10nLocale} from "angular-l10n";

@Component({
    selector: "app-root",
    templateUrl: "./app.component.html"
})
export class AppComponent implements OnInit {
    constructor(
        @Inject(L10N_LOCALE) public locale: L10nLocale
    ) {
    }

    ngOnInit(): void {
    }
}