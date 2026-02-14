import {Component, Inject, OnInit} from "@angular/core";
import {L10N_LOCALE, L10nLocale} from "angular-l10n";
import {AuthService} from "../../core/auth/auth.service";
import {ToastService} from "../../core/error/toast.service";
import {AdminService, InvitationToken} from "../../core/services/admin.service";
import {TitleService} from "../../core/services/title.service";

@Component({
    selector: "app-invitation-tokens",
    templateUrl: "./invitation-tokens.component.html",
    styleUrls: ["./invitation-tokens.component.css"],
    standalone: false
})
export class InvitationTokensComponent implements OnInit {
    tokens: InvitationToken[] = [];
    expiresInHours: number | null = null;
    registrationMode = "open";

    constructor(
        @Inject(L10N_LOCALE) public readonly locale: L10nLocale,
        private readonly adminService: AdminService,
        private readonly authService: AuthService,
        private readonly toast: ToastService,
        private readonly titleService: TitleService,
    ) {
        this.titleService.setTitle("InvitationTokens", true);
    }

    ngOnInit(): void {
        this.loadTokens();
        this.authService.getRegistrationInfo().subscribe({
            next: info => {
                this.registrationMode = info.registrationMode;
            }
        });
    }

    loadTokens(): void {
        this.adminService.getInvitationTokens().subscribe({
            next: tokens => {
                this.tokens = tokens;
            }
        });
    }

    createToken(): void {
        this.adminService.createInvitationToken({expiresInHours: this.expiresInHours}).subscribe({
            next: () => {
                this.toast.showSuccess("TokenCreated");
                this.loadTokens();
                this.expiresInHours = null;
            }
        });
    }

    deleteToken(id: number): void {
        this.adminService.deleteInvitationToken(id).subscribe({
            next: () => {
                this.toast.showSuccess("TokenDeleted");
                this.loadTokens();
            }
        });
    }

    copyToken(token: string): void {
        void navigator.clipboard.writeText(token).then(() => {
            this.toast.showSuccess("TokenCopied");
        });
    }

    copyRegistrationLink(token: string): void {
        const link = `${window.location.origin}/register?token=${token}`;
        void navigator.clipboard.writeText(link).then(() => {
            this.toast.showSuccess("TokenCopied");
        });
    }
}
