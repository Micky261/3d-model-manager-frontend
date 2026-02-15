import {Component, Inject, OnInit} from "@angular/core";
import {FormBuilder, Validators} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {L10N_LOCALE, L10nLocale} from "angular-l10n";
import {AuthService} from "../../core/auth/auth.service";
import {TitleService} from "../../core/services/title.service";
import {ServerMessage} from "../../core/types/serverMessage.type";

@Component({
    selector: "app-password-reset",
    templateUrl: "./password-reset.component.html",
    styleUrls: ["./password-reset.component.css"],
    standalone: false
})
export class PasswordResetComponent implements OnInit {
    resetForm = new FormBuilder().group({
        password: ["", [Validators.required, Validators.minLength(8)]],
        passwordConfirm: ["", [Validators.required]],
    });

    status: "form" | "success" | "error" = "form";
    errorMessage = "";
    private token = "";

    constructor(
        @Inject(L10N_LOCALE) public readonly locale: L10nLocale,
        private readonly titleService: TitleService,
        private readonly authService: AuthService,
        private readonly route: ActivatedRoute,
    ) {
        this.titleService.setTitle("ResetPassword", true);
    }

    ngOnInit(): void {
        this.token = this.route.snapshot.paramMap.get("token") || "";

        if (!this.token) {
            this.status = "error";
            this.errorMessage = "InvalidOrExpiredToken";
        }
    }

    submit(): void {
        if (!this.resetForm.get("password").valid) {
            return;
        }

        if (this.resetForm.get("password").value !== this.resetForm.get("passwordConfirm").value) {
            return;
        }

        this.authService.resetPassword(this.token, this.resetForm.get("password").value).subscribe({
            next: () => {
                this.status = "success";
            },
            error: error => {
                this.status = "error";
                this.errorMessage = (error.error as ServerMessage)?.messageCode || "InvalidOrExpiredToken";
            }
        });
    }
}
