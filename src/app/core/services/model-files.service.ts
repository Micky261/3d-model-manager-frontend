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
            file, file.name, this.httpClient, `${Environment.apiUrl}/file/${encodeURIComponent(String(modelId))}`, type, progress
        );
    }

    getFiles(modelId: number): Observable<ModelFile[]> {
        return this.httpClient.get<ModelFile[]>(`${Environment.apiUrl}/files/${encodeURIComponent(String(modelId))}`);
    }

    getFilesWithType(modelId: number, type: string): Observable<ModelFile[]> {
        return this.httpClient.get<ModelFile[]>(`${Environment.apiUrl}/files/${encodeURIComponent(String(modelId))}/${encodeURIComponent(String(type))}`);
    }

    getZip(modelId: number, type: string): Observable<HttpResponse<Blob>> {
        let header = new HttpHeaders();
        header = header.set("Accept", "application/octet-stream");

        return this.httpClient.get(`${Environment.apiUrl}/zip/${encodeURIComponent(String(modelId))}/${encodeURIComponent(String(type))}`,
            {
                responseType: "blob",
                observe: "response",
                headers: header
            }
        );
    }

    getFile(fileId: number): Observable<HttpResponse<Blob>> {
        return this.httpClient.get(`${Environment.apiUrl}/file/single/${encodeURIComponent(String(fileId))}`,
            {
                responseType: "blob",
                observe: "response",
            });
    }

    deleteFile(fileId: number): Observable<any> {
        return this.httpClient.delete<any>(`${Environment.apiUrl}/file/${encodeURIComponent(String(fileId))}`);
    }

    updateFiles(modelId: number, modelFiles: ModelFile[]): Observable<ModelFile[]> {
        return this.httpClient.post<ModelFile[]>(`${Environment.apiUrl}/files/${encodeURIComponent(String(modelId))}`, modelFiles);
    }
}
