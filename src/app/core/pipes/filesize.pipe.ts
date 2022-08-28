import {Pipe, PipeTransform} from "@angular/core";
import * as fsize from "filesize";

@Pipe({
    name: "filesize"
})
export class FileSizePipe implements PipeTransform {
    transform(value: number, options?: any) {
        return fsize(value, options);
    }
}
