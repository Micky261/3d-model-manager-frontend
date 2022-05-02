import {Component, Inject, OnInit} from "@angular/core";
import {L10N_LOCALE, L10nLocale} from "angular-l10n";

@Component({
    selector: "app-list",
    templateUrl: "./list.component.html",
    styleUrls: ["./list.component.css"]
})
export class ListComponent implements OnInit {
    constructor(
        @Inject(L10N_LOCALE) public readonly locale: L10nLocale
    ) {
    }

    ngOnInit(): void {
    }
}
