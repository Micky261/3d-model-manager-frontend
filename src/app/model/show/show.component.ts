import {Component, Inject, OnInit} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {L10N_LOCALE, L10nLocale} from "angular-l10n";
import {ToastService} from "../../core/error/toast.service";
import {ModelService} from "../../core/model.service";
import {Model} from "../../core/types/model.type";

@Component({
    selector: "app-show",
    templateUrl: "./show.component.html",
    styleUrls: ["./show.component.css"]
})
export class ShowComponent implements OnInit {
    modelId: number;
    model: Model;

    constructor(
        @Inject(L10N_LOCALE) public locale: L10nLocale,
        private readonly toast: ToastService,
        private readonly modelService: ModelService,
        private readonly route: ActivatedRoute,
        private readonly router: Router
    ) {
        this.modelId = parseInt(this.route.snapshot.paramMap.get("id"), 10);
    }

    ngOnInit(): void {
        this.modelService.getModel(this.modelId).subscribe((m: Model) => {
            this.model = m;
        }, error => {
            void this.router.navigateByUrl("/not-found").then(() => true);
        });
    }
}
