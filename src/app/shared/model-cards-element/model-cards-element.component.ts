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
    @Input() listType: "newest" | "random" | "all" = "random";
    @Input() numberOfModels = 4;
    @Input() pageSize = 20;
    models: Model[];

    constructor(
        @Inject(L10N_LOCALE) public readonly locale: L10nLocale,
        private readonly modelService: ModelService
    ) {
    }

    ngOnInit(): void {
        let subscription: Observable<Model[]>;
        switch (this.listType) {
            case "random":
                subscription = this.modelService.getRandomModels(this.numberOfModels);
                break;
            case "all":
                subscription = this.modelService.getAllModels();
                break;
            default:
                subscription = this.modelService.getNewestModels(this.numberOfModels);

        }

        subscription.subscribe(models => this.models = models);
    }
}
