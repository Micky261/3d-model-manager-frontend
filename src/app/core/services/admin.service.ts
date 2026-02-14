import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {Environment} from "../../../environment";

export interface InvitationToken {
    id: number;
    token: string;
    createdBy: number;
    usedBy: number | null;
    expiresAt: string | null;
    usedAt: string | null;
    createdAt: string;
    isUsed: boolean;
    isExpired: boolean;
    isValid: boolean;
}

export interface CreateInvitationTokenRequest {
    expiresInHours: number | null;
}

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
}
