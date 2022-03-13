import {Component, Inject, Input, OnInit} from "@angular/core";
import {L10N_LOCALE, L10nLocale} from "angular-l10n";
import {Observable} from "rxjs";
import {ModelService} from "../../core/services/model.service";
import {Model} from "../../core/types/model.type";

@Component({
    selector: "app-model-cards-element",
    templateUrl: "./model-cards-element.component.html",
    styleUrls: ["./model-cards-element.component.css"]
})
export class ModelCardsElementComponent implements OnInit {
    @Input() number: number = 3;
    @Input() type: "newest" | "random" = "random";
    models: Model[];

    constructor(
        @Inject(L10N_LOCALE) public readonly locale: L10nLocale,
        private readonly modelService: ModelService
    ) {
    }

    ngOnInit(): void {
        let subscription: Observable<Model[]>;
        switch (this.type) {
            case "newest":
                subscription = this.modelService.getNewestModels(this.number);
                break;
            case "random":
                subscription = this.modelService.getRandomModels(this.number);
                break;
        }

        subscription.subscribe(models => this.models = models);
    }
}
