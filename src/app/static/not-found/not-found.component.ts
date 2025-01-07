import {Component, Inject, OnInit} from "@angular/core";
import {L10N_LOCALE, L10nLocale} from "angular-l10n";

@Component({
    selector: "app-not-found",
    templateUrl: "./not-found.component.html",
    styleUrls: ["./not-found.component.css"],
    standalone: false
})
export class NotFoundComponent implements OnInit {
    constructor(
        @Inject(L10N_LOCALE) public readonly locale: L10nLocale
    ) {
    }

    ngOnInit(): void {
    }
}
