import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {Environment} from "../../../environment";
import {InvitationToken} from "../types/invitation-token.type";
import {CreateInvitationTokenRequest} from "../types/requests/create-invitation-token-request.type";
import {UserAdmin} from "../types/user-admin.type";

@Injectable({
    providedIn: "root"
})
export class AdminService {
    constructor(
        private readonly httpClient: HttpClient,
        private readonly environment: Environment
    ) {
    }

    getInvitationTokens(): Observable<InvitationToken[]> {
        return this.httpClient.get<InvitationToken[]>(`${this.environment.apiUrl()}/admin/invitation-tokens`);
    }

    createInvitationToken(request: CreateInvitationTokenRequest): Observable<InvitationToken> {
        return this.httpClient.post<InvitationToken>(`${this.environment.apiUrl()}/admin/invitation-tokens`, request);
    }

    deleteInvitationToken(id: number): Observable<any> {
        return this.httpClient.delete(`${this.environment.apiUrl()}/admin/invitation-tokens/${id}`);
    }

    getUsers(): Observable<UserAdmin[]> {
        return this.httpClient.get<UserAdmin[]>(`${this.environment.apiUrl()}/admin/users`);
    }

    deleteUser(userId: number): Observable<any> {
        return this.httpClient.delete(`${this.environment.apiUrl()}/admin/users/${userId}`);
    }

    changeUserEmail(userId: number, email: string): Observable<any> {
        return this.httpClient.put(`${this.environment.apiUrl()}/admin/users/${userId}/email`, {email});
    }
}
