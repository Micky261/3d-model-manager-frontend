import {Component, Inject, OnInit} from "@angular/core";
import {FormBuilder, Validators} from "@angular/forms";
import {L10N_LOCALE, L10nLocale, L10nTranslationService} from "angular-l10n";
import {ToastrService} from "ngx-toastr";
import {AuthService} from "../core/auth/auth.service";
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

    constructor(
        @Inject(L10N_LOCALE) public locale: L10nLocale,
        private readonly translator: L10nTranslationService,
        private readonly toastr: ToastrService,
        private readonly authService: AuthService
    ) {
    }

    ngOnInit(): void {
    }

    login(): void {
        if (!this.loginForm.get("email").valid) {
            this.toastr.error(this.translator.translate("error.EnterValidEmail"));

            return;
        }

        if (!this.loginForm.get("password").valid) {
            this.toastr.error(this.translator.translate("error.EnterPassword"));

            return;
        }

        const login: Login = new Login(this.loginForm.get("email").value, this.loginForm.get("password").value);
        this.authService.login(login).subscribe(value => {
            console.log("A");
            console.log(value);
        },
        error => {
            console.log("B");
            console.log(error);
            console.log(error.error);
            console.log((error.error as ServerMessage).message_code);
        });
    }
}
