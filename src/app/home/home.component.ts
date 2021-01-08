import {Component, Inject, OnInit} from "@angular/core";
import {L10N_LOCALE, L10nLocale} from "angular-l10n";
import {ModelsService} from "../core/models.service";
import {Models} from "../core/types/models.type";

@Component({
    selector: "app-home",
    templateUrl: "./home.component.html",
    styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {
    randomModels: Models[];

    constructor(
        @Inject(L10N_LOCALE) public locale: L10nLocale,
        private readonly modelsService: ModelsService
    ) {
    }

    ngOnInit(): void {
        this.modelsService.getRandomModels(6).subscribe(models => this.randomModels = models);
    }

}
