import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {Configuration} from "../../../configuration";
import {Environment} from "../../../environment";
import {AccessToken} from "../types/accessToken.type";
import {Login} from "../types/login.type";
import {Register} from "../types/register.type";
import {ServerMessage} from "../types/serverMessage.type";

@Injectable({
    providedIn: "root"
})
export class AuthService {
    static readonly localStorageTokenKey = "Token";
    static readonly localStorageTokenExp = "TokenExpiration";

    constructor(private readonly httpClient: HttpClient) {
    }

    login(login: Login): Observable<AccessToken> {
        return this.httpClient.post<any>(`${Environment.apiUrl}/login`, login);
    }

    register(register: Register): Observable<ServerMessage> {
        return this.httpClient.post<ServerMessage>(`${Environment.apiUrl}/register`, register);
    }

    isLoggedIn(): boolean {
        const keySet = localStorage.getItem(AuthService.localStorageTokenKey) != null;
        const tokenExp = parseInt(localStorage.getItem(AuthService.localStorageTokenExp), 10);
        const now = Date.now();

        return (keySet && now < tokenExp);
    }
}
