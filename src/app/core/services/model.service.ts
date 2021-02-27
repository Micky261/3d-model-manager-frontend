import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {Configuration} from "../../../configuration";
import {Model} from "../types/model.type";
import {ServerMessage} from "../types/serverMessage.type";

@Injectable({
    providedIn: "root"
})
export class ModelService {
    private readonly apiUrl: string;

    constructor(private readonly httpClient: HttpClient) {
        this.apiUrl = Configuration.server + Configuration.folder;
    }

    getRandomModels(num: number): Observable<Model[]> {
        return this.httpClient.get<Model[]>(`${this.apiUrl}/models/random/${encodeURIComponent(String(num))}`);
    }

    importModel(importUrl: string): Observable<ServerMessage> {
        const body = JSON.stringify({"url": importUrl});

        return this.httpClient.post<ServerMessage>(`${this.apiUrl}/model/import`, body);
    }

    /**
     * This method creates a new model on the server.
     *
     * @param model Model to create
     */
    postModel(model: Model): Observable<Model> {
        return this.httpClient.post<Model>(`${this.apiUrl}/model/data`, model);
    }

    /**
     * Update the given model (with its identifier)
     *
     * @param model Model to update
     */
    updateModel(model: Model): Observable<Model> {
        return this.httpClient.put<Model>(`${this.apiUrl}/model/data/${encodeURIComponent(String(model.id))}`, model);
    }

    getModel(id: number): Observable<Model> {
        return this.httpClient.get<Model>(`${this.apiUrl}/model/data/${encodeURIComponent(String(id))}`);
    }
}
