import {Component, Inject, OnInit, ViewChild} from "@angular/core";
import {Router} from "@angular/router";
import {L10N_LOCALE, L10nLocale, L10nTranslationService} from "angular-l10n";
import {CookieService} from "ngx-cookie-service";
import {AuthService} from "../app/core/auth/auth.service";
import {ToastService} from "../app/core/error/toast.service";
// eslint-disable-next-line @typescript-eslint/no-unused-vars -- Is used
import {locales} from "../i18n/l10n-config";

@Component({
    selector: "navbar",
    templateUrl: "./navbar.component.html",
    styleUrls: ["./navbar.component.css"]
})
export class NavbarComponent implements OnInit {
    locales = locales;
    isCollapsed = true;

    @ViewChild("searchInput", {static: false}) searchInput: HTMLInputElement;

    constructor(
        @Inject(L10N_LOCALE) public readonly locale: L10nLocale,
        readonly authService: AuthService,
        private readonly translation: L10nTranslationService,
        private readonly router: Router,
        private readonly toast: ToastService,
        private readonly cookieService: CookieService
    ) {
    }

    ngOnInit(): void {
    }

    setLocale(locale: L10nLocale): void {
        void this.translation.setLocale(locale).then(() => true);
    }

    search(t: string): void {
        void this.router.navigate(["search", "models"], {
            queryParams: {term: t}
        }).then(() => true);
    }

    logout(): void {
        this.cookieService.delete(AuthService.sessionCookieName);
        this.toast.showSuccess("Logout");
        void this.router.navigate(["/login"]).then(() => true);
    }
}
