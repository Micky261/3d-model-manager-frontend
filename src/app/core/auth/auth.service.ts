import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {CookieService} from "ngx-cookie-service";
import {Observable} from "rxjs";
import {Environment} from "../../../environment";
import {Login} from "../types/login.type";
import {Register} from "../types/register.type";
import {ServerMessage} from "../types/serverMessage.type";
import {Session} from "../types/session.type";

@Injectable({
    providedIn: "root"
})
export class AuthService {
    static readonly sessionCookieName: string = "3DMM_Session";

    constructor(
        private readonly httpClient: HttpClient,
        private readonly cookieService: CookieService,
        private readonly environment: Environment
    ) {
    }

    login(login: Login): Observable<Session> {
        return this.httpClient.post<any>(`${this.environment.apiUrl()}/login`, login);
    }

    register(register: Register): Observable<ServerMessage> {
        return this.httpClient.post<ServerMessage>(`${this.environment.apiUrl()}/register`, register);
    }

    verifyEmail(token: string): Observable<ServerMessage> {
        return this.httpClient.get<ServerMessage>(`${this.environment.apiUrl()}/auth/email/verify/${token}`);
    }

    resendVerification(): Observable<ServerMessage> {
        return this.httpClient.post<ServerMessage>(`${this.environment.apiUrl()}/auth/email/resend`, {});
    }

    getRegistrationInfo(): Observable<{registrationMode: string}> {
        return this.httpClient.get<{registrationMode: string}>(`${this.environment.apiUrl()}/registration-info`);
    }

    checkAdminStatus(): Observable<{isAdmin: boolean}> {
        return this.httpClient.get<{isAdmin: boolean}>(`${this.environment.apiUrl()}/admin/status`);
    }

    isLoggedIn(): boolean {
        return this.cookieService.check(AuthService.sessionCookieName);
    }

    getSession(): string {
        return this.cookieService.get(AuthService.sessionCookieName);
    }
}
