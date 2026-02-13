import {Component, Inject, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {L10N_LOCALE, L10nLocale} from "angular-l10n";
import {AuthService} from "../core/auth/auth.service";
import {ToastService} from "../core/error/toast.service";
import {TitleService} from "../core/services/title.service";
import {ServerMessage} from "../core/types/serverMessage.type";

@Component({
    selector: "app-email-resend",
    templateUrl: "./email-resend.component.html",
    styleUrls: ["./email-resend.component.css"],
    standalone: false
})
export class EmailResendComponent implements OnInit {
    resendStatus: "idle" | "loading" | "success" | "error" = "idle";

    constructor(
        @Inject(L10N_LOCALE) public readonly locale: L10nLocale,
        private readonly titleService: TitleService,
        private readonly authService: AuthService,
        private readonly toast: ToastService,
        private readonly router: Router,
    ) {
        this.titleService.setTitle("ResendVerification", true);
    }

    ngOnInit(): void {
        if (!this.authService.isLoggedIn()) {
            void this.router.navigateByUrl("/login").then(() => true);
        }
    }

    resendVerification(): void {
        this.resendStatus = "loading";

        this.authService.resendVerification().subscribe({
            next: () => {
                this.resendStatus = "success";
                this.toast.showSuccess("VerificationResent");
            },
            error: error => {
                this.resendStatus = "error";
                this.toast.showBackendError((error.error as ServerMessage).messageCode);
            }
        });
    }
}
