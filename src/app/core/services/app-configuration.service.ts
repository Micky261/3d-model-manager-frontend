/* eslint-disable no-console */
import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {firstValueFrom} from "rxjs";
import {AppConfiguration} from "../types/app-configuration.type";

@Injectable({providedIn: "root"})
export class AppConfigurationService {
    private settings: AppConfiguration;

    constructor(private http: HttpClient) {
    }

    async load(): Promise<void> {
        return firstValueFrom(
            this.http.get<AppConfiguration>("config/configuration.json")
        ).then((data: AppConfiguration) => {
            this.settings = data;
        }).catch(() => {
            console.warn("Could not load configuration.json");
        });
    }

    getConfiguration(): any {
        return this.settings;
    }
}
