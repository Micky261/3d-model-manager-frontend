import {Inject, Injectable} from "@angular/core";
import {L10N_LOCALE, L10nLocale, L10nTranslationService} from "angular-l10n";
import {ToastrService} from "ngx-toastr";

@Injectable({
    providedIn: "root"
})
export class ToastService {
    constructor(
        @Inject(L10N_LOCALE) public readonly locale: L10nLocale,
        private readonly translator: L10nTranslationService,
        private readonly toastr: ToastrService
    ) {
    }

    showSuccess(messageCode: string): void {
        if (this.messageCodeAvailable(messageCode)) {
            this.toastr.success(this.translator.translate(`success.${messageCode}`) as string);
        } else {
            this.toastr.success(this.translator.translate("success.Unknown") as string);
        }
    }

    showBackendError(messageCode: string): void {
        this.showErrorMessage(messageCode, "backend");
    }

    showValidationError(messageCode: string): void {
        this.showErrorMessage(messageCode, "validation");
    }

    private showErrorMessage(messageCode: string, errorType: string): void {
        if (this.messageCodeAvailable(messageCode, true, errorType)) {
            this.toastr.error(this.translator.translate(`error.${errorType}.${messageCode}`) as string);
        } else {
            this.toastr.error(this.translator.translate("error.Unknown") as string);
        }
    }

    private messageCodeAvailable(messageCode: string, error = false, errorType = ""): boolean {
        const errorSuccess = (error) ? "error" : "success";

        if (errorType === "") {
            return this.translator.has(`${errorSuccess}.${messageCode}`);
        } else {
            return this.translator.has(`${errorSuccess}.${errorType}.${messageCode}`);
        }
    }
}
