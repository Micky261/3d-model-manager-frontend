import {Injectable} from "@angular/core";
import {Path, Value} from "ngx-value";

@Injectable({providedIn: "root"})
@Path("config/configuration.json")
export class Environment {
    @Value("server") server: string;
    @Value("path") path: string;

    public apiUrl(): string {
        return this.server + this.path;
    }
}
