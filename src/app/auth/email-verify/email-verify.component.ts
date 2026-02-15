import {Component, Inject, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {L10N_LOCALE, L10nLocale} from "angular-l10n";
import {AuthService} from "../../core/auth/auth.service";
import {TitleService} from "../../core/services/title.service";

@Component({
    selector: "app-email-verify",
    templateUrl: "./email-verify.component.html",
    styleUrls: ["./email-verify.component.css"],
    standalone: false
})
export class EmailVerifyComponent implements OnInit {
    verificationStatus: "loading" | "success" | "error" = "loading";
    errorMessage = "";

    constructor(
        @Inject(L10N_LOCALE) public readonly locale: L10nLocale,
        private readonly titleService: TitleService,
        private readonly authService: AuthService,
        private readonly route: ActivatedRoute,
    ) {
        this.titleService.setTitle("VerifyEmail", true);
    }

    ngOnInit(): void {
        const token = this.route.snapshot.paramMap.get("token");

        if (!token) {
            this.verificationStatus = "error";
            this.errorMessage = "InvalidToken";
            return;
        }

        this.authService.verifyEmail(token).subscribe({
            next: () => {
                this.verificationStatus = "success";
            },
            error: error => {
                this.verificationStatus = "error";
                this.errorMessage = error.error?.messageCode || "InvalidOrExpiredToken";
            }
        });
    }
}
