import {Component, Inject, OnInit} from "@angular/core";
import {FormBuilder, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {L10N_LOCALE, L10nLocale} from "angular-l10n";
import {AuthService} from "../../core/auth/auth.service";
import {ToastService} from "../../core/error/toast.service";
import {TitleService} from "../../core/services/title.service";
import {Register} from "../../core/types/register.type";
import {ServerMessage} from "../../core/types/serverMessage.type";

@Component({
    selector: "app-register",
    templateUrl: "./register.component.html",
    styleUrls: ["./register.component.css"],
    standalone: false
})
export class RegisterComponent implements OnInit {
    registerForm = new FormBuilder().group({
        name: ["", [Validators.required, Validators.minLength(2)]],
        email: ["", [Validators.required, Validators.email]],
        password: ["", [Validators.required, Validators.minLength(8)]],
        passwordConfirm: ["", [Validators.required]],
        invitationToken: [""],
    });

    registrationSuccess = false;
    registrationMode = "open";
    isLoading = false;

    constructor(
        @Inject(L10N_LOCALE) public readonly locale: L10nLocale,
        private readonly titleService: TitleService,
        private readonly authService: AuthService,
        private readonly toast: ToastService,
        private readonly router: Router,
        private readonly route: ActivatedRoute,
    ) {
        this.titleService.setTitle("Register", true);
    }

    ngOnInit(): void {
        if (this.authService.isLoggedIn()) {
            void this.router.navigateByUrl("/").then(() => true);
            return;
        }

        this.authService.getRegistrationInfo().subscribe({
            next: info => {
                this.registrationMode = info.registrationMode;
            }
        });

        this.route.queryParams.subscribe(params => {
            if (params.token) {
                this.registerForm.get("invitationToken").setValue(params.token as string);
            }
        });
    }

    register(): void {
        if (!this.registerForm.get("name").valid) {
            this.toast.showValidationError("EnterName");
            return;
        }

        if (!this.registerForm.get("email").valid) {
            this.toast.showValidationError("EnterValidEmail");
            return;
        }

        if (!this.registerForm.get("password").valid) {
            this.toast.showValidationError("PasswordTooShort");
            return;
        }

        if (this.registerForm.get("password").value !== this.registerForm.get("passwordConfirm").value) {
            this.toast.showValidationError("PasswordMismatch");
            return;
        }

        if (this.registrationMode === "token" && !this.registerForm.get("invitationToken").value) {
            this.toast.showValidationError("InvitationTokenRequired");
            return;
        }

        const tokenValue = this.registerForm.get("invitationToken").value;
        const register: Register = new Register(
            this.registerForm.get("name").value,
            this.registerForm.get("email").value,
            this.registerForm.get("password").value,
            tokenValue ? tokenValue : undefined
        );

        this.isLoading = true;
        this.authService.register(register).subscribe({
            next: () => {
                this.registrationSuccess = true;
            },
            error: error => {
                this.isLoading = false;
                this.toast.showBackendError((error.error as ServerMessage).messageCode);
            }
        });
    }
}
