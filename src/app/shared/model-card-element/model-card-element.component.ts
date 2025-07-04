import {Component, EventEmitter, Inject, Input, OnInit, Output} from "@angular/core";
import {L10N_LOCALE, L10nLocale} from "angular-l10n";
import {Environment} from "../../../environment";
import {AuthService} from "../../core/auth/auth.service";
import {Collection} from "../../core/types/collection.type";
import {Model, ModelWithTags} from "../../core/types/model.type";

@Component({
    selector: "app-model-card-element",
    templateUrl: "./model-card-element.component.html",
    styleUrls: ["./model-card-element.component.css"],
    standalone: false
})
export class ModelCardElementComponent implements OnInit {
    @Input() model: (Model | ModelWithTags);

    sessionName = AuthService.sessionCookieName;
    sessionId: string;
    apiUrl = this.environment.apiUrl();

    @Input() editCollection: Collection = null;
    @Output() collectionEditEvent = new EventEmitter<{ event: "delete" | "setMain"; modelId: number }>();

    constructor(
        @Inject(L10N_LOCALE) public readonly locale: L10nLocale,
        private readonly authService: AuthService,
        private readonly environment: Environment
    ) {
    }

    ngOnInit(): void {
        this.sessionId = this.authService.getSession();
    }

    isMainModelOfCollection(): boolean {
        if (this.editCollection === null) return false;
        else return this.editCollection.mainModel === this.model.id;
    }
}
