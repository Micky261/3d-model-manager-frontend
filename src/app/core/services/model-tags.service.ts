import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {Environment} from "../../../environment";
import {ModelTag} from "../types/model-tag.type";

@Injectable({
    providedIn: "root"
})
export class ModelTagsService {
    constructor(
        private readonly httpClient: HttpClient,
        private readonly environment: Environment
    ) {
    }

    getAllTags(): Observable<{ tag: string; count: number }[]> {
        return this.httpClient.get<{ tag: string; count: number }[]>(`${this.environment.apiUrl()}/tags/all`);
    }

    getModelTags(modelId: number): Observable<ModelTag[]> {
        return this.httpClient.get<ModelTag[]>(`${this.environment.apiUrl()}/tags/model/${encodeURIComponent(String(modelId))}`);
    }

    postModelTag(modelId: number, tag: string): Observable<ModelTag | null> {
        return this.httpClient.post<ModelTag | null>(
            `${this.environment.apiUrl()}/tags/model/${encodeURIComponent(String(modelId))}/${encodeURIComponent(String(tag))}`,
            null
        );
    }

    deleteModelTag(modelId: number, tag: string): Observable<any> {
        return this.httpClient.delete(
            `${this.environment.apiUrl()}/tags/model/${encodeURIComponent(String(modelId))}/${encodeURIComponent(String(tag))}`
        );
    }
}
