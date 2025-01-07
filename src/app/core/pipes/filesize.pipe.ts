import {Pipe, PipeTransform} from "@angular/core";
import {filesize} from "filesize";

@Pipe({
    name: "filesize",
    standalone: false
})
export class FileSizePipe implements PipeTransform {
    transform(value: number) {
        return filesize(value);
    }
}
