import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Injectable, Optional} from "@angular/core";
import {L10nProvider, L10nTranslationLoader} from "angular-l10n";
import {Observable} from "rxjs";

@Injectable()
export class TranslationLoader implements L10nTranslationLoader {
    constructor(@Optional() private http: HttpClient) {
    }

    public get(language: string, provider: L10nProvider): Observable<{ [key: string]: any }> {
        const url = `${provider.asset}${language}.json`;
        const options = {
            headers: new HttpHeaders({"Content-Type": "application/json"}),
            params: new HttpParams().set("v", provider.options.version as string|number|boolean)
        };

        return this.http.get(url, options);
    }

}
