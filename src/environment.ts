import {Injectable} from "@angular/core";
import {AppConfigurationService} from "./app/core/services/app-configuration.service";
import {AppConfiguration} from "./app/core/types/app-configuration.type";

@Injectable({providedIn: "root"})
export class Environment {
    configuration: AppConfiguration;

    constructor(private appConfigurationService: AppConfigurationService) {
        this.configuration = this.appConfigurationService.getConfiguration();
    }

    public apiUrl(): string {
        return this.configuration.server + this.configuration.path;
    }
}
