import {Component, Inject, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {L10N_LOCALE, L10nLocale, L10nTranslationService} from "angular-l10n";
import {ToastService} from "../app/core/error/toast.service";
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
        private readonly translation: L10nTranslationService,
        private readonly router: Router,
        private readonly toast: ToastService
    ) {
    }

    ngOnInit(): void {
    }

    setLocale(locale: L10nLocale): void {
        void this.translation.setLocale(locale).then(() => true);
    }

    logout(): void {
        localStorage.removeItem("Token");
        this.toast.showSuccess("Logout");
        void this.router.navigate(["/login"]).then(() => true);
    }
}
