import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
    name: "pascalCase",
    standalone: false
})
export class PascalCasePipe implements PipeTransform {
    transform(s: string): string {
        return s.replace(/(\w)(\w*)/g,
            function (g0: string, g1: string, g2: string) {
                return g1.toUpperCase() + g2;
            });
    }
}
