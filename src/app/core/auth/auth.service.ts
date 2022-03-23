import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {CookieService} from "ngx-cookie-service";
import {Observable} from "rxjs";
import {Environment} from "../../../environment";
import {Session} from "../types/session.type";
import {Login} from "../types/login.type";
import {Register} from "../types/register.type";
import {ServerMessage} from "../types/serverMessage.type";

@Injectable({
    providedIn: "root"
})
export class AuthService {
    static readonly sessionCookieName: string = "3DMM_Session";

    constructor(
        private readonly httpClient: HttpClient,
        private readonly cookieService: CookieService
    ) {
    }

    login(login: Login): Observable<Session> {
        return this.httpClient.post<any>(`${Environment.apiUrl}/login`, login);
    }

    register(register: Register): Observable<ServerMessage> {
        return this.httpClient.post<ServerMessage>(`${Environment.apiUrl}/register`, register);
    }

    isLoggedIn(): boolean {
        return this.cookieService.check(AuthService.sessionCookieName);
    }

}
