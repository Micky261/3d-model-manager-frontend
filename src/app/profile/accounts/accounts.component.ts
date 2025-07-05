import {Component, ElementRef, Inject, OnInit, ViewChild} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {L10N_LOCALE, L10nLocale, L10nTranslationService} from "angular-l10n";
import "../../../shared/array.extension";
import "../../../shared/string.extension";
import {ToastrService} from "ngx-toastr";
import {ImportSource} from "src/app/core/enums/import-source.enum";
import {UserSettingsKey} from "../../core/enums/user-settings-key.enum";
import {UserSettingsType} from "../../core/enums/user-settings-type.enum";
import {ToastService} from "../../core/error/toast.service";
import {CollectionService} from "../../core/services/collection.service";
import {ImportService} from "../../core/services/import.service";
import {ProfileSettingsService} from "../../core/services/profile-settings.service";
import {UserSetting} from "../../core/types/user-setting.type";

@Component({
    selector: "app-profile-accounts",
    templateUrl: "./accounts.component.html",
    styleUrls: ["./accounts.component.css"],
    standalone: false
})
export class AccountsComponent implements OnInit {
    ImportSource = ImportSource;
    UserSettingsKey = UserSettingsKey;

    enabledImporters: ImportSource[];
    accountsSettings: UserSetting[];

    @ViewChild("cults3dSessionId", {static: false}) cults3dSessionId: ElementRef<HTMLInputElement>;
    @ViewChild("makerworldSessionToken", {static: false}) makerworldSessionToken: ElementRef<HTMLInputElement>;

    constructor(
        @Inject(L10N_LOCALE) public readonly locale: L10nLocale,
        private readonly importService: ImportService,
        private readonly profileSettingsService: ProfileSettingsService,
        private readonly translator: L10nTranslationService,
        private readonly route: ActivatedRoute,
        private readonly router: Router,
        private readonly toast: ToastService,
        private readonly toastr: ToastrService,
        private readonly collectionService: CollectionService,
        readonly modalService: NgbModal
    ) {
    }

    ngOnInit(): void {
        this.importService.getEnabledImporters().subscribe((ei: ImportSource[]) =>
            this.enabledImporters = ei
        );

        this.profileSettingsService.getAccountsSettings().subscribe((s: UserSetting[]) =>
            this.accountsSettings = s
        );
    }

    saveAccountSettings() {
        const cults3dSessionId = this.cults3dSessionId.nativeElement.value;
        const cultsSetting = new UserSetting(UserSettingsKey.Cults3dSessionId, UserSettingsType.Account, cults3dSessionId);

        const makerWorldSessionToken = this.makerworldSessionToken.nativeElement.value;
        const makerWorldSetting = new UserSetting(UserSettingsKey.MakerWorldSessionToken, UserSettingsType.Account, makerWorldSessionToken);

        this.profileSettingsService.saveAccountsSettings([cultsSetting, makerWorldSetting]).subscribe(() =>
            this.toastr.success(this.translator.translate("Saved") as string)
        );
    }

    getSetting(key: UserSettingsKey): string {
        const result = this.accountsSettings.find((setting) => setting.key === key.valueOf());
        console.log(result);

        if (!result) return "";
        else return result.value;
    }
}
