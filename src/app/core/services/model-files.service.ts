import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {Configuration} from "../../../configuration";
import {ChunkedUploadService} from "./chunked-upload.service";
import {ModelFile} from "../types/model-file.type";

@Injectable({
    providedIn: "root"
})
export class ModelFilesService {
    private readonly apiUrl: string;

    constructor(private readonly httpClient: HttpClient) {
        this.apiUrl = Configuration.server + Configuration.folder;
    }

    putFile(modelId: number, file: File, type: string, progress: { current: number; total: number }): Promise<any> {
        return ChunkedUploadService.chunkedUpload(
            file, file.name, this.httpClient, `${this.apiUrl}/model/file/${encodeURIComponent(String(modelId))}`, type, progress
        );
    }

    getFiles(modelId: number, type: string): Observable<ModelFile[]> {
        return this.httpClient.get<ModelFile[]>(`${this.apiUrl}/model/files/${encodeURIComponent(String(modelId))}/${encodeURIComponent(String(type))}`);
    }

    getFileUrl(modelId: number, type: string, filename: string): string {
        return `${this.apiUrl}/model/file/${encodeURIComponent(String(modelId))}/${encodeURIComponent(String(filename))}/${encodeURIComponent(String(type))}`;
    }

    getFile(modelId: number, type: string, filename: string): Observable<ModelFile[]> {
        const m = encodeURIComponent(String(modelId));
        const f = encodeURIComponent(String(filename));
        const t = encodeURIComponent(String(type));
        return this.httpClient.get<ModelFile[]>(`${this.apiUrl}/model/file/${m}/${f}/${t}`);
    }
}
