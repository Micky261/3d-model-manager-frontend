import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {Environment} from "../../../environment";
import {Model, ModelWithTags} from "../types/model.type";

@Injectable({
    providedIn: "root"
})
export class ModelService {
    constructor(private readonly httpClient: HttpClient) {
    }

    getAllModels(): Observable<Model[]> {
        return this.httpClient.get<Model[]>(`${Environment.apiUrl}/models`);
    }

    getAllModelsWithTags(): Observable<ModelWithTags[]> {
        return this.httpClient.get<ModelWithTags[]>(`${Environment.apiUrl}/models/with-tags`);
    }

    /**
     * This method creates a new model on the server.
     */
    postModel(model: Model): Observable<Model> {
        return this.httpClient.post<Model>(`${Environment.apiUrl}/model/data`, model);
    }

    /**
     * Update the given model (with its identifier)
     */
    updateModel(model: Model): Observable<Model> {
        return this.httpClient.put<Model>(`${Environment.apiUrl}/model/data/${encodeURIComponent(String(model.id))}`, model);
    }

    getModel(id: number): Observable<Model> {
        return this.httpClient.get<Model>(`${Environment.apiUrl}/model/data/${encodeURIComponent(String(id))}`);
    }

    deleteModel(id: number): Observable<Model> {
        return this.httpClient.delete<Model>(`${Environment.apiUrl}/model/${encodeURIComponent(String(id))}`);
    }

    getNewestModels(num: number): Observable<Model[]> {
        return this.httpClient.get<Model[]>(`${Environment.apiUrl}/models/newest/${encodeURIComponent(String(num))}`);
    }

    getRandomModels(num: number): Observable<Model[]> {
        return this.httpClient.get<Model[]>(`${Environment.apiUrl}/models/random/${encodeURIComponent(String(num))}`);
    }
}
