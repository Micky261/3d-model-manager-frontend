import {Component, Inject, Input, OnInit} from "@angular/core";
import {L10N_LOCALE, L10nLocale} from "angular-l10n";
import {Environment} from "../../../environment";
import {AuthService} from "../../core/auth/auth.service";
import {Model, ModelWithTags} from "../../core/types/model.type";

@Component({
    selector: "app-model-card-element",
    templateUrl: "./model-card-element.component.html",
    styleUrls: ["./model-card-element.component.css"]
})
export class ModelCardElementComponent implements OnInit {
    @Input() model: (Model | ModelWithTags);

    sessionName = AuthService.sessionCookieName;
    sessionId: string;
    apiUrl = this.environment.apiUrl();

    constructor(
        @Inject(L10N_LOCALE) public readonly locale: L10nLocale,
        private readonly authService: AuthService,
        private readonly environment: Environment
    ) {
    }

    ngOnInit(): void {
        this.sessionId = this.authService.getSession();
    }
}
