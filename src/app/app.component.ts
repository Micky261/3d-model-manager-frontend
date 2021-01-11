import {Component, Inject, OnInit} from "@angular/core";
import {NgSelectConfig} from "@ng-select/ng-select";
import {L10N_LOCALE, L10nLocale, L10nTranslationService} from "angular-l10n";

@Component({
    selector: "app-root",
    templateUrl: "./app.component.html"
})
export class AppComponent implements OnInit {
    constructor(
        @Inject(L10N_LOCALE) public locale: L10nLocale,
        private readonly translationService: L10nTranslationService,
        private readonly ngSelectConfig: NgSelectConfig
    ) {
        this.ngSelectConfig.notFoundText = this.translationService.translate("NothingFound");
    }

    ngOnInit(): void {
    }
}
