import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {Configuration} from "../../../configuration";
import {Environment} from "../../../environment";
import {Model} from "../types/model.type";
import {ServerMessage} from "../types/serverMessage.type";

@Injectable({
    providedIn: "root"
})
export class ModelService {
    constructor(private readonly httpClient: HttpClient) {
    }

    getRandomModels(num: number): Observable<Model[]> {
        return this.httpClient.get<Model[]>(`${Environment.apiUrl}/models/random/${encodeURIComponent(String(num))}`);
    }

    importModel(importUrl: string): Observable<ServerMessage> {
        const body = JSON.stringify({"url": importUrl});

        return this.httpClient.post<ServerMessage>(`${Environment.apiUrl}/model/import`, body);
    }

    /**
     * This method creates a new model on the server.
     *
     * @param model Model to create
     */
    postModel(model: Model): Observable<Model> {
        return this.httpClient.post<Model>(`${Environment.apiUrl}/model/data`, model);
    }

    /**
     * Update the given model (with its identifier)
     *
     * @param model Model to update
     */
    updateModel(model: Model): Observable<Model> {
        return this.httpClient.put<Model>(`${Environment.apiUrl}/model/data/${encodeURIComponent(String(model.id))}`, model);
    }

    getModel(id: number): Observable<Model> {
        return this.httpClient.get<Model>(`${Environment.apiUrl}/model/data/${encodeURIComponent(String(id))}`);
    }
}
