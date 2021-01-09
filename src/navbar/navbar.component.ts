import {Component, Inject, OnInit} from "@angular/core";
import {L10N_CONFIG, L10N_LOCALE, L10nConfig, L10nLocale, L10nTranslationService} from "angular-l10n";
import {locales} from "../i18n/l10n-config";

@Component({
    selector: "navbar",
    templateUrl: "./navbar.component.html"
})
export class NavbarComponent implements OnInit {
    locales = locales;
    localStorage = localStorage;

    isCollapsed = true;

    constructor(
        @Inject(L10N_LOCALE) public locale: L10nLocale,
        @Inject(L10N_CONFIG) private l10nConfig: L10nConfig,
        private translation: L10nTranslationService
    ) {
    }

    ngOnInit(): void {
    }

    setLocale(locale: L10nLocale): void {
        void this.translation.setLocale(locale).then(() => true);
    }
}
