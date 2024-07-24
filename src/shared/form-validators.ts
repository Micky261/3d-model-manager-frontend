import {AbstractControl, ValidatorFn} from "@angular/forms";

export const urlValidator: ValidatorFn = (control: AbstractControl) => {
    return validateUrl(control.value as string|URL) ? null : {invalidUrl: true};
};

function validateUrl(url: string | URL): boolean {
    try {
        new URL(url);
        return true;
    } catch {
        return false;
    }
}
