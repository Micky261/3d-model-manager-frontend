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
    @Input() numberOfModels: number;
    @Input() pageSize: number;
    @Input() halfSize = false;
    models: Model[];
    page = 1; // Pages are 1-based
    cssClasses = "row row-cols-1 justify-content-center ";

    constructor(
        @Inject(L10N_LOCALE) public readonly locale: L10nLocale,
        private readonly modelService: ModelService
    ) {
    }

    ngOnInit(): void {
        this.cssClasses += (this.halfSize)
            ? "row-cols-sm-2 row-cols-lg-3 row-cols-xxl-4"
            : "row-cols-sm-3 row-cols-md-5 row-cols-lg-6 row-cols-xl-7 row-cols-xxl-8";
        this.pageSize = (this.pageSize) ? this.pageSize : this.numberOfModels;

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
