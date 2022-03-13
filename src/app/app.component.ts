import {DOCUMENT} from "@angular/common";
import {Component, Inject, OnInit} from "@angular/core";
import {NgSelectConfig} from "@ng-select/ng-select";
import {L10N_LOCALE, L10nLocale, L10nTranslationService} from "angular-l10n";
import {langCodes} from "../i18n/l10n-config";

@Component({
    selector: "app-root",
    templateUrl: "./app.component.html"
})
export class AppComponent implements OnInit {
    constructor(
        @Inject(L10N_LOCALE) public readonly locale: L10nLocale,
        private readonly translationService: L10nTranslationService,
        private readonly ngSelectConfig: NgSelectConfig,
        @Inject(DOCUMENT) private document: Document
    ) {
        this.ngSelectConfig.notFoundText = this.translationService.translate("NothingFound");
    }

    ngOnInit(): void {
        this.document.documentElement.lang = langCodes[this.locale.language].iana;
    }
}
