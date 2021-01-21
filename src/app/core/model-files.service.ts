import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Configuration} from "../../configuration";
import {ChunkedUploadService} from "./chunked-upload.service";

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
}
