import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {Environment} from "../../../environment";
import {ModelLink} from "../types/model-link.type";

@Injectable({
    providedIn: "root"
})
export class ModelLinksService {

    constructor(private readonly httpClient: HttpClient) {
    }

    getModelLinks(modelId: number): Observable<ModelLink[]> {
        return this.httpClient.get<ModelLink[]>(`${Environment.apiUrl}/links/model/${encodeURIComponent(String(modelId))}`);
    }

    addModelLink(modelId: number, modelLink: ModelLink): Observable<ModelLink | null> {
        return this.httpClient.post<ModelLink | null>(
            `${Environment.apiUrl}/links/model/${encodeURIComponent(String(modelId))}`,
            modelLink
        );
    }

    updateModelLink(id: number, modelLink: ModelLink): Observable<ModelLink | null> {
        return this.httpClient.put<ModelLink | null>(
            `${Environment.apiUrl}/links/${encodeURIComponent(String(id))}`,
            modelLink
        );
    }

    deleteModelTag(id: number): Observable<any> {
        return this.httpClient.delete(
            `${Environment.apiUrl}/links/${encodeURIComponent(String(id))}`
        );
    }
}
