import {HttpClient, HttpResponse} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {Environment} from "../../../environment";
import {ThumbnailFormat} from "../enums/thumbnail-format.enum";

@Injectable({
    providedIn: "root"
})
export class ThumbnailService {
    constructor(private readonly httpClient: HttpClient) {
    }

    getThumbnail(fileId: number, size: number, format: ThumbnailFormat = ThumbnailFormat.Rectangular): Observable<HttpResponse<Blob>> {
        return this.httpClient.get(`${Environment.apiUrl}/search/thumbnails/file/${encodeURIComponent(fileId)}/`, {
            params: {
                format,
                size,
            },
            responseType: "blob",
            observe: "response",
        });
    }
}
