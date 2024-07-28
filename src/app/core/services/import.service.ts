import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {Environment} from "../../../environment";
import {ImportSource} from "../enums/import-source.enum";

@Injectable({
    providedIn: "root"
})
export class ImportService {
    constructor(
        private readonly httpClient: HttpClient,
        private readonly environment: Environment
    ) {
    }

    getEnabledImporters(): Observable<ImportSource[]> {
        return this.httpClient.get<ImportSource[]>(`${this.environment.apiUrl()}/import/enabled`);
    }

    import(importer: ImportSource, data: object): Observable<any> {
        return this.httpClient.post<any>(`${this.environment.apiUrl()}/import/${encodeURIComponent(importer)}`, data);
    }
}
