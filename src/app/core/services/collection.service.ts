import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {Environment} from "../../../environment";
import {Collection} from "../types/collection.type";
import {Model} from "../types/model.type";

@Injectable({
    providedIn: "root"
})
export class CollectionService {
    constructor(
        private readonly httpClient: HttpClient,
        private readonly environment: Environment
    ) {
    }

    getCollections(): Observable<Collection[]> {
        return this.httpClient.get<Collection[]>(`${this.environment.apiUrl()}/collections`);
    }

    getCollectionsOfModel(modelId: number): Observable<Collection[]> {
        return this.httpClient.get<Collection[]>(`${this.environment.apiUrl()}/collections/models/${encodeURIComponent(modelId)}`);
    }

    getCollection(id: number): Observable<Collection> {
        return this.httpClient.get<Collection>(`${this.environment.apiUrl()}/collection/data/${encodeURIComponent(id)}`);
    }

    createCollection(collection: Collection): Observable<Collection> {
        return this.httpClient.post<Collection>(`${this.environment.apiUrl()}/collection/data`, collection);
    }

    updateCollection(id: number, collection: Collection): Observable<Collection> {
        return this.httpClient.put<Collection>(`${this.environment.apiUrl()}/collection/data/${encodeURIComponent(id)}`, collection);
    }

    deleteCollection(id: number): Observable<Collection> {
        return this.httpClient.delete<Collection>(`${this.environment.apiUrl()}/collection/${encodeURIComponent(id)}`);
    }

    createRelation(id: number, modelId: number): Observable<Collection> {
        return this.httpClient.post<Collection>(`${this.environment.apiUrl()}/collection/` +
            `relation/${encodeURIComponent(id)}/${encodeURIComponent(modelId)}`, null);
    }

    deleteRelation(id: number, modelId: number): Observable<any> {
        return this.httpClient.delete<any>(`${this.environment.apiUrl()}/collection/relation/${encodeURIComponent(id)}/${encodeURIComponent(modelId)}`);
    }

    getModelsInCollection(id: number): Observable<Model[]> {
        return this.httpClient.get<Model[]>(`${this.environment.apiUrl()}/collection/models/${encodeURIComponent(id)}`);
    }
}
