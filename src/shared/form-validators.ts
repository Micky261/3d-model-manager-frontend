import {AbstractControl, ValidatorFn} from "@angular/forms";

export const urlValidator: ValidatorFn = (control: AbstractControl) => {
    return validateUrl(control.value) ? null : {invalidUrl: true};
};

// eslint-disable-next-line prefer-arrow/prefer-arrow-functions
function validateUrl(url: any): boolean {
    try {
        new URL(url);
        return true;
    } catch {
        return false;
    }
}
