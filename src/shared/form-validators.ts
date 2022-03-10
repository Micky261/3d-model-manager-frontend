import {AbstractControl, ValidatorFn} from "@angular/forms";

export const urlValidator: ValidatorFn = (control: AbstractControl) => {
    return validateUrl(control.value as string|URL) ? null : {invalidUrl: true};
};

// eslint-disable-next-line prefer-arrow/prefer-arrow-functions
function validateUrl(url: string | URL): boolean {
    try {
        new URL(url);
        return true;
    } catch {
        return false;
    }
}
