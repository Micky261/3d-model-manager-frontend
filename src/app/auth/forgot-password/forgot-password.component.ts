import {Component, Inject} from "@angular/core";
import {FormBuilder, Validators} from "@angular/forms";
import {L10N_LOCALE, L10nLocale} from "angular-l10n";
import {AuthService} from "../../core/auth/auth.service";
import {TitleService} from "../../core/services/title.service";

@Component({
    selector: "app-forgot-password",
    templateUrl: "./forgot-password.component.html",
    styleUrls: ["./forgot-password.component.css"],
    standalone: false
})
export class ForgotPasswordComponent {
    forgotPasswordForm = new FormBuilder().group({
        email: ["", [Validators.required, Validators.email]],
    });

    status: "form" | "sent" = "form";
    isLoading = false;

    constructor(
        @Inject(L10N_LOCALE) public readonly locale: L10nLocale,
        private readonly titleService: TitleService,
        private readonly authService: AuthService,
    ) {
        this.titleService.setTitle("ForgotPasswordTitle", true);
    }

    submit(): void {
        if (!this.forgotPasswordForm.get("email").valid) {
            return;
        }

        this.isLoading = true;
        this.authService.requestPasswordReset(this.forgotPasswordForm.get("email").value).subscribe({
            next: () => {
                this.status = "sent";
            },
            error: () => {
                this.status = "sent";
            }
        });
    }
}
