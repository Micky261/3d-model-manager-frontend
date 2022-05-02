import {Component, Inject, OnInit} from "@angular/core";
import {FormBuilder, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {L10N_LOCALE, L10nLocale} from "angular-l10n";
import {CookieService} from "ngx-cookie-service";
import {AuthService} from "../core/auth/auth.service";
import {ToastService} from "../core/error/toast.service";
import {Session} from "../core/types/session.type";
import {Login} from "../core/types/login.type";
import {ServerMessage} from "../core/types/serverMessage.type";

@Component({
    selector: "app-login",
    templateUrl: "./login.component.html",
    styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
    loginForm = new FormBuilder().group({
        email: ["", [Validators.required, Validators.email]],
        password: ["", [Validators.required]],
    });
    returnUrl: string;

    constructor(
        @Inject(L10N_LOCALE) public readonly locale: L10nLocale,
        private readonly authService: AuthService,
        private readonly toast: ToastService,
        private readonly route: ActivatedRoute,
        private readonly router: Router,
        private readonly cookieService: CookieService
    ) {
    }

    ngOnInit(): void {
        this.returnUrl = this.route.snapshot.queryParams.returnUrl || "/";

        if (this.authService.isLoggedIn()) {
            void this.router.navigateByUrl(this.returnUrl).then(() => true);
        }
    }

    login(): void {
        if (!this.loginForm.get("email").valid) {
            this.toast.showValidationError("EnterValidEmail");

            return;
        }

        if (!this.loginForm.get("password").valid) {
            this.toast.showValidationError("EnterPassword");

            return;
        }

        const login: Login = new Login(this.loginForm.get("email").value as string, this.loginForm.get("password").value as string);
        this.authService.login(login).subscribe({
            next: (session: Session) => {
                this.cookieService.set(
                    AuthService.sessionCookieName,
                    session.session_id,
                    new Date(session.session_expiry * 1000)
                );

                this.toast.showSuccess("Login");
                void this.router.navigateByUrl(this.returnUrl).then(() => true);
            },
            error: error => {
                this.toast.showBackendError((error.error as ServerMessage).message_code);
            }
        });
    }
}
