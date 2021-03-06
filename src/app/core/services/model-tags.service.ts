import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {Configuration} from "../../../configuration";
import {ModelTag} from "../types/model-tag.type";

@Injectable({
    providedIn: "root"
})
export class ModelTagsService {
    private readonly apiUrl: string;

    constructor(private readonly httpClient: HttpClient) {
        this.apiUrl = Configuration.server + Configuration.folder;
    }

    getAllTags(): Observable<{ tag: string; count: number }[]> {
        return this.httpClient.get<{ tag: string; count: number }[]>(`${this.apiUrl}/tags/all`);
    }

    getModelTags(modelId: number): Observable<ModelTag[]> {
        return this.httpClient.get<ModelTag[]>(`${this.apiUrl}/model/tags/${encodeURIComponent(String(modelId))}`);
    }

    postModelTag(modelId: number, tag: string): Observable<ModelTag|null> {
        return this.httpClient.post<ModelTag|null>(`${this.apiUrl}/model/tag/${encodeURIComponent(String(modelId))}/${encodeURIComponent(String(tag))}`, null);
    }

    deleteModelTag(modelId: number, tag: string): Observable<any> {
        return this.httpClient.delete(`${this.apiUrl}/model/tag/${encodeURIComponent(String(modelId))}/${encodeURIComponent(String(tag))}`);
    }
}
