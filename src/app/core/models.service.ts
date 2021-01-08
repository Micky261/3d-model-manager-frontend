import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {Configuration} from "../../configuration";
import {Models} from "./models.type";

@Injectable({
    providedIn: "root"
})
export class ModelsService {
    private readonly apiUrl: string;

    constructor(private readonly httpClient: HttpClient) {
        this.apiUrl = Configuration.server + Configuration.folder;
    }

    getRandomModels(num: number): Observable<Models[]> {
        return this.httpClient.get<Models[]>(`${this.apiUrl}/models/random/${encodeURIComponent(String(num))}`);
    }
}
