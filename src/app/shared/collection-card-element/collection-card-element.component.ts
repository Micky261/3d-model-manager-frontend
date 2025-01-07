import {Component, Inject, Input, OnInit} from "@angular/core";
import {L10N_LOCALE, L10nLocale} from "angular-l10n";
import {Environment} from "../../../environment";
import {AuthService} from "../../core/auth/auth.service";
import {Collection} from "../../core/types/collection.type";

@Component({
    selector: "app-collection-card-element",
    templateUrl: "./collection-card-element.component.html",
    styleUrls: ["./collection-card-element.component.css"],
    standalone: false
})
export class CollectionCardElementComponent implements OnInit {
    @Input() collection: Collection;

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
