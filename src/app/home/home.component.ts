import {Component, Inject, OnInit} from "@angular/core";
import {L10N_LOCALE, L10nLocale} from "angular-l10n";
import {ModelService} from "../core/services/model.service";
import {TitleService} from "../core/services/title.service";
import {Model} from "../core/types/model.type";

@Component({
    selector: "app-home",
    templateUrl: "./home.component.html",
    styleUrls: ["./home.component.css"],
    standalone: false
})
export class HomeComponent implements OnInit {
    randomModels: Model[];
    newestModels: Model[];

    constructor(
        @Inject(L10N_LOCALE) public readonly locale: L10nLocale,
        private readonly titleService: TitleService,
        private readonly modelService: ModelService
    ) {
        this.titleService.setTitle("Home", true);
    }

    ngOnInit(): void {
        this.modelService.getRandomModels(4).subscribe(models => this.randomModels = models);
        this.modelService.getNewestModels(4).subscribe(models => this.newestModels = models);
    }
}
