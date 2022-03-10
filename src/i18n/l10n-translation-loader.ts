import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Injectable, Optional} from "@angular/core";
import {L10nProvider, L10nTranslationLoader} from "angular-l10n";
import {Observable} from "rxjs";

@Injectable()
export class TranslationLoader implements L10nTranslationLoader {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    constructor(@Optional() private http: HttpClient) {
    }

    public get(language: string, provider: L10nProvider): Observable<{ [key: string]: any }> {
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        const url = `${provider.asset}${language}.json`;
        const options = {
            // eslint-disable-next-line @typescript-eslint/naming-convention
            headers: new HttpHeaders({"Content-Type": "application/json"}),
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            params: new HttpParams().set("v", provider.options.version as string|number|boolean)
        };

        return this.http.get(url, options);
    }

}
