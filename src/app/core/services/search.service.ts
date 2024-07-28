import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {Environment} from "../../../environment";
import {Model} from "../types/model.type";

@Injectable({
    providedIn: "root"
})
export class SearchService {
    constructor(
        private readonly httpClient: HttpClient,
        private readonly environment: Environment
    ) {
    }

    searchModels(searchTerm: string, searchFields: string[]): Observable<Model[]> {
        const s = searchFields.map(f => encodeURIComponent(f)).join(String.fromCharCode(31));
        return this.httpClient.get<Model[]>(`${this.environment.apiUrl()}/search/models/${encodeURIComponent(searchTerm)}/${s}`);
    }
}
