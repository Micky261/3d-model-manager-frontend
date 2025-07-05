import {Component, Inject, OnInit} from "@angular/core";
import {L10N_LOCALE, L10nLocale} from "angular-l10n";
import {ModelService} from "../../core/services/model.service";
import {TitleService} from "../../core/services/title.service";
import {Model} from "../../core/types/model.type";

@Component({
    selector: "app-profile-show",
    templateUrl: "./profile-show.component.html",
    styleUrls: ["./profile-show.component.css"],
    standalone: false
})
export class ProfileShowComponent implements OnInit {
    favorites: Model[];

    constructor(
        @Inject(L10N_LOCALE) public readonly locale: L10nLocale,
        private readonly titleService: TitleService,
        private readonly modelService: ModelService
    ) {
        this.titleService.setTitle("Profile", true);
    }

    ngOnInit(): void {
        this.modelService.getFavorites().subscribe(models => this.favorites = models);
    }
}
