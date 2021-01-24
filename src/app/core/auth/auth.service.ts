import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {Configuration} from "../../../configuration";
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
    private readonly apiUrl: string;

    constructor(private readonly httpClient: HttpClient) {
        this.apiUrl = Configuration.server + Configuration.folder;
    }

    login(login: Login): Observable<AccessToken> {
        return this.httpClient.post<any>(`${this.apiUrl}/login`, login);
    }

    register(register: Register): Observable<ServerMessage> {
        return this.httpClient.post<ServerMessage>(`${this.apiUrl}/register`, register);
    }

    isLoggedIn(): boolean {
        const keySet = localStorage.getItem(AuthService.localStorageTokenKey) != null;
        const tokenExp = parseInt(localStorage.getItem(AuthService.localStorageTokenExp), 10);
        const now = Date.now();

        return (keySet && now < tokenExp);
    }
}
