import {Injectable} from "@angular/core";
import {Title} from "@angular/platform-browser";
import {L10nTranslationService} from "angular-l10n";

@Injectable({providedIn: "root"})
export class TitleService {
    public currentTitle: string = "";
    public isTranslated: boolean = false;
    public translationParams: object = {};

    constructor(
        private readonly title: Title,
        private translationService: L10nTranslationService,
    ) {
        translationService.onChange().subscribe(() => {
            this.setTitle(this.currentTitle, this.isTranslated, this.translationParams);
        });
    }

    public setTitle(newTitle: string, isTranslated: boolean = false, translationParams: object = {}): void {
        this.currentTitle = newTitle;

        if (isTranslated) {
            newTitle = this.translationService.translate(newTitle, translationParams);
        }
        this.isTranslated = isTranslated;
        this.translationParams = translationParams;

        this.title.setTitle(`${newTitle} - 3D Model Manager`);
    }
}
