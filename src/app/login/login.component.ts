import {Component, Inject, OnInit} from "@angular/core";
import {FormBuilder, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {L10N_LOCALE, L10nLocale} from "angular-l10n";
import {AuthService} from "../core/auth/auth.service";
import {ToastService} from "../core/error/toast.service";
import {AccessToken} from "../core/types/accessToken.type";
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
        @Inject(L10N_LOCALE) public locale: L10nLocale,
        private readonly authService: AuthService,
        private readonly toast: ToastService,
        private readonly route: ActivatedRoute,
        private readonly router: Router
    ) {
        this.returnUrl = this.route.snapshot.queryParams.returnUrl || "/";
    }

    ngOnInit(): void {
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

        const login: Login = new Login(this.loginForm.get("email").value, this.loginForm.get("password").value);
        this.authService.login(login).subscribe((token: AccessToken) => {
            localStorage.setItem(AuthService.localStorageTokenKey, token.access_token);

            this.toast.showSuccess("Login");

            void this.router.navigateByUrl(this.returnUrl).then(() => true);
        }, error => {
            this.toast.showBackendError((error.error as ServerMessage).message_code);
        });
    }
}
