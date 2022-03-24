import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {Environment} from "../../../environment";

@Injectable({
    providedIn: "root"
})
export class ImportService {
    constructor(private readonly httpClient: HttpClient) {
    }

    getEnabledImporters(): Observable<string[]> {
        return this.httpClient.get<string[]>(`${Environment.apiUrl}/import/enabled`);
    }

    import(importer: string, data: object): Observable<any> {
        return this.httpClient.post<any>(`${Environment.apiUrl}/import/${encodeURIComponent(importer)}`, data);
    }
}
