import {Component, Inject, OnInit} from "@angular/core";
import {L10N_LOCALE, L10nLocale} from "angular-l10n";
import {ModelService} from "../core/model.service";
import {Model} from "../core/types/model.type";

@Component({
    selector: "app-home",
    templateUrl: "./home.component.html",
    styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {
    randomModels: Model[];

    constructor(
        @Inject(L10N_LOCALE) public locale: L10nLocale,
        private readonly modelService: ModelService
    ) {
    }

    ngOnInit(): void {
        this.modelService.getRandomModels(6).subscribe(models => this.randomModels = models);
    }

}
