import {Component, Inject, OnInit} from "@angular/core";
import {L10N_LOCALE, L10nLocale, L10nTranslationService} from "angular-l10n";
import {ToastService} from "../../core/error/toast.service";
import {AdminService} from "../../core/services/admin.service";
import {UserAdmin} from "../../core/types/user-admin.type";
import {TitleService} from "../../core/services/title.service";

@Component({
    selector: "app-user-management",
    templateUrl: "./user-management.component.html",
    standalone: false
})
export class UserManagementComponent implements OnInit {
    users: UserAdmin[] = [];
    editingEmailUserId: number | null = null;
    editingEmailValue = "";

    constructor(
        @Inject(L10N_LOCALE) public readonly locale: L10nLocale,
        private readonly adminService: AdminService,
        private readonly toast: ToastService,
        private readonly titleService: TitleService,
        private readonly translation: L10nTranslationService,
    ) {
        this.titleService.setTitle("UserManagement", true);
    }

    ngOnInit(): void {
        this.loadUsers();
    }

    loadUsers(): void {
        this.adminService.getUsers().subscribe({
            next: users => {
                this.users = users;
            }
        });
    }

    deleteUser(id: number, name: string): void {
        const message = this.translation.translate("ConfirmDeleteUser", {name}) as string;
        if (confirm(message)) {
            this.adminService.deleteUser(id).subscribe({
                next: () => {
                    this.toast.showSuccess("UserDeleted");
                    this.loadUsers();
                }
            });
        }
    }

    startEditEmail(user: UserAdmin): void {
        this.editingEmailUserId = user.id;
        this.editingEmailValue = user.email;
    }

    cancelEditEmail(): void {
        this.editingEmailUserId = null;
        this.editingEmailValue = "";
    }

    saveEmail(userId: number): void {
        this.adminService.changeUserEmail(userId, this.editingEmailValue).subscribe({
            next: () => {
                this.toast.showSuccess("AdminEmailChanged");
                this.editingEmailUserId = null;
                this.editingEmailValue = "";
                this.loadUsers();
            }
        });
    }
}
