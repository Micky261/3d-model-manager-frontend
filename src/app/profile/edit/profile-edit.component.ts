import {Component, Inject, OnInit} from "@angular/core";
import {FormBuilder, Validators} from "@angular/forms";
import {L10N_LOCALE, L10nLocale} from "angular-l10n";
import {ToastService} from "../../core/error/toast.service";
import {ProfileService} from "../../core/services/profile.service";
import {TitleService} from "../../core/services/title.service";
import {ServerMessage} from "../../core/types/serverMessage.type";

@Component({
    selector: "app-profile-edit",
    templateUrl: "./profile-edit.component.html",
    styleUrls: ["./profile-edit.component.css"],
    standalone: false
})
export class ProfileEditComponent implements OnInit {
    nameForm = new FormBuilder().group({
        name: ["", [Validators.required, Validators.minLength(2)]],
    });

    emailForm = new FormBuilder().group({
        email: ["", [Validators.required, Validators.email]],
        currentPassword: ["", [Validators.required]],
    });

    passwordForm = new FormBuilder().group({
        currentPassword: ["", [Validators.required]],
        newPassword: ["", [Validators.required, Validators.minLength(8)]],
        newPasswordConfirm: ["", [Validators.required]],
    });

    constructor(
        @Inject(L10N_LOCALE) public readonly locale: L10nLocale,
        private readonly titleService: TitleService,
        private readonly profileService: ProfileService,
        private readonly toast: ToastService,
    ) {
        this.titleService.setTitle("EditProfile", true);
    }

    ngOnInit(): void {
        this.profileService.getProfile().subscribe({
            next: profile => {
                this.nameForm.get("name").setValue(profile.name);
                this.emailForm.get("email").setValue(profile.email);
            }
        });
    }

    changeName(): void {
        if (!this.nameForm.get("name").valid) {
            this.toast.showValidationError("EnterName");
            return;
        }

        this.profileService.changeName(this.nameForm.get("name").value).subscribe({
            next: () => {
                this.toast.showSuccess("NameChanged");
            },
            error: error => {
                this.toast.showBackendError((error.error as ServerMessage).messageCode);
            }
        });
    }

    changeEmail(): void {
        if (!this.emailForm.get("email").valid) {
            this.toast.showValidationError("EnterValidEmail");
            return;
        }

        if (!this.emailForm.get("currentPassword").valid) {
            this.toast.showValidationError("EnterPassword");
            return;
        }

        this.profileService.changeEmail(
            this.emailForm.get("email").value,
            this.emailForm.get("currentPassword").value
        ).subscribe({
            next: () => {
                this.toast.showSuccess("EmailChanged");
                this.emailForm.get("currentPassword").reset();
            },
            error: error => {
                this.toast.showBackendError((error.error as ServerMessage).messageCode);
            }
        });
    }

    changePassword(): void {
        if (!this.passwordForm.get("currentPassword").valid) {
            this.toast.showValidationError("EnterPassword");
            return;
        }

        if (!this.passwordForm.get("newPassword").valid) {
            this.toast.showValidationError("PasswordTooShort");
            return;
        }

        if (this.passwordForm.get("newPassword").value !== this.passwordForm.get("newPasswordConfirm").value) {
            this.toast.showValidationError("PasswordMismatch");
            return;
        }

        this.profileService.changePassword(
            this.passwordForm.get("currentPassword").value,
            this.passwordForm.get("newPassword").value
        ).subscribe({
            next: () => {
                this.toast.showSuccess("PasswordChanged");
                this.passwordForm.reset();
            },
            error: error => {
                this.toast.showBackendError((error.error as ServerMessage).messageCode);
            }
        });
    }
}
