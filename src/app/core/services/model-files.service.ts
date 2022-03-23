import {HttpClient, HttpHeaders, HttpResponse} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {Environment} from "../../../environment";
import {ModelFile} from "../types/model-file.type";
import {ChunkedUploadService} from "./chunked-upload.service";

@Injectable({
    providedIn: "root"
})
export class ModelFilesService {
    constructor(private readonly httpClient: HttpClient) {
    }

    putFile(modelId: number, file: File, type: string, progress: { current: number; total: number }): Promise<any> {
        return ChunkedUploadService.chunkedUpload(
            file, file.name, this.httpClient, `${Environment.apiUrl}/model/file/${encodeURIComponent(String(modelId))}`, type, progress
        );
    }

    getFiles(modelId: number): Observable<ModelFile[]> {
        return this.httpClient.get<ModelFile[]>(`${Environment.apiUrl}/model/files/${encodeURIComponent(String(modelId))}`);
    }

    getFilesWithType(modelId: number, type: string): Observable<ModelFile[]> {
        return this.httpClient.get<ModelFile[]>(`${Environment.apiUrl}/model/files/${encodeURIComponent(String(modelId))}/${encodeURIComponent(String(type))}`);
    }

    getZip(modelId: number, type: string): Observable<HttpResponse<Blob>> {
        let header = new HttpHeaders();
        header = header.set("Accept", "application/octet-stream");

        return this.httpClient.get(`${Environment.apiUrl}/model/zip/${encodeURIComponent(String(modelId))}/${encodeURIComponent(String(type))}`,
            {
                responseType: "blob",
                observe: "response",
                headers: header
            }
        );
    }

    getFileUrl(modelId: number, type: string, filename: string): string {
        const m = encodeURIComponent(String(modelId));
        const f = encodeURIComponent(String(filename));
        const t = encodeURIComponent(String(type));
        return `${Environment.apiUrl}/model/file/${m}/${f}/${t}`;
    }

    getFile(modelId: number, type: string, filename: string): Observable<any> {
        const url = this.getFileUrl(modelId, type, filename);
        return this.httpClient.get<any>(url);
    }

    deleteFile(modelId: number, type: string, filename: string): Observable<any> {
        const url = this.getFileUrl(modelId, type, filename);
        return this.httpClient.delete<any>(url);
    }

    updateFiles(modelId: number, modelFiles: ModelFile[]): Observable<ModelFile[]> {
        return this.httpClient.post<ModelFile[]>(`${Environment.apiUrl}/model/files/${encodeURIComponent(String(modelId))}`, modelFiles);
    }
}
