import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {Environment} from "../../../environment";
import {Model, ModelWithTags} from "../types/model.type";

@Injectable({
    providedIn: "root"
})
export class ModelService {
    constructor(
        private readonly httpClient: HttpClient,
        private readonly environment: Environment
    ) {
    }

    getAllModels(): Observable<Model[]> {
        return this.httpClient.get<Model[]>(`${this.environment.apiUrl()}/models`);
    }

    getAllModelsWithTags(): Observable<ModelWithTags[]> {
        return this.httpClient.get<ModelWithTags[]>(`${this.environment.apiUrl()}/models/with-tags`);
    }

    /**
     * This method creates a new model on the server.
     */
    postModel(model: Model): Observable<Model> {
        return this.httpClient.post<Model>(`${this.environment.apiUrl()}/model/data`, model);
    }

    /**
     * Update the given model (with its identifier)
     */
    updateModel(model: Model): Observable<Model> {
        return this.httpClient.put<Model>(`${this.environment.apiUrl()}/model/data/${encodeURIComponent(String(model.id))}`, model);
    }

    getModel(id: number): Observable<Model> {
        return this.httpClient.get<Model>(`${this.environment.apiUrl()}/model/data/${encodeURIComponent(String(id))}`);
    }

    deleteModel(id: number): Observable<Model> {
        return this.httpClient.delete<Model>(`${this.environment.apiUrl()}/model/${encodeURIComponent(String(id))}`);
    }

    getNewestModels(num: number): Observable<Model[]> {
        return this.httpClient.get<Model[]>(`${this.environment.apiUrl()}/models/newest/${encodeURIComponent(String(num))}`);
    }

    getRandomModels(num: number): Observable<Model[]> {
        return this.httpClient.get<Model[]>(`${this.environment.apiUrl()}/models/random/${encodeURIComponent(String(num))}`);
    }

    getFavorites(): Observable<Model[]> {
        return this.httpClient.get<Model[]>(`${this.environment.apiUrl()}/models/favorites`);
    }
}
