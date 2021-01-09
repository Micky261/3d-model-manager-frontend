import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {Configuration} from "../../configuration";
import {Models} from "./types/models.type";
import {ServerMessage} from "./types/serverMessage.type";

@Injectable({
    providedIn: "root"
})
export class ModelService {
    private readonly apiUrl: string;

    constructor(private readonly httpClient: HttpClient) {
        this.apiUrl = Configuration.server + Configuration.folder;
    }

    getRandomModels(num: number): Observable<Models[]> {
        return this.httpClient.get<Models[]>(`${this.apiUrl}/models/random/${encodeURIComponent(String(num))}`);
    }

    importModel(importUrl: string): Observable<ServerMessage> {
        const body = JSON.stringify({"url": importUrl});

        return this.httpClient.post<ServerMessage>(`${this.apiUrl}/model/import`, body);
    }
}
