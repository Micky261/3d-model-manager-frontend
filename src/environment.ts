import {Configuration} from "./configuration";

export class Environment {
    public static readonly apiUrl: string = Configuration.server + Configuration.folder;
}
