import {Injectable} from "@angular/core";
import {L10nLocale, L10nStorage} from "angular-l10n";
import {locales} from "./l10n-config";

@Injectable()
export class Storage implements L10nStorage {
    public async read(): Promise<L10nLocale | null> {
        return Promise.resolve(locales[localStorage.getItem("locale")]);
    }

    public async write(locale: L10nLocale): Promise<void> {
        localStorage.setItem("locale", locale.language);

        return new Promise(null);
    }
}
