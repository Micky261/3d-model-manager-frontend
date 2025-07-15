import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {Environment} from "../../../environment";
import {UserSetting} from "../types/user-setting.type";

@Injectable({
    providedIn: "root"
})
export class ProfileSettingsService {
    constructor(
        private readonly httpClient: HttpClient,
        private readonly environment: Environment
    ) {
    }

    getAccountsSettings(): Observable<UserSetting[]> {
        return this.httpClient.get<UserSetting[]>(`${this.environment.apiUrl()}/profile/settings/accounts/`);
    }

    saveAccountsSettings(settings: UserSetting[]): Observable<UserSetting[]> {
        return this.httpClient.post<UserSetting[]>(`${this.environment.apiUrl()}/profile/settings/accounts/`, settings);
    }
}
