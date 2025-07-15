import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {Environment} from "../../../environment";
import {ProfileStats} from "../types/profile-stats.type";
import {UserSetting} from "../types/user-setting.type";

@Injectable({
    providedIn: "root"
})
export class ProfileService {
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

    getProfileStats(): Observable<ProfileStats> {
        return this.httpClient.get<ProfileStats>(`${this.environment.apiUrl()}/profile/stats`);
    }
}
