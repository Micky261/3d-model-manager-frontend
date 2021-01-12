import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
    name: "arraySort"
})
export class ArraySortPipe implements PipeTransform {
    transform(array: any[], descending: boolean): any[] {
        if (!Array.isArray(array)) {
            return;
        }

        let descSwitch = 0;
        if (descending === true) {
            descSwitch = 2;
        }

        array.sort((a: any, b: any) => {
            if (a < b) {
                return descSwitch - 1;
            } else if (a > b) {
                return 1 - descSwitch;
            } else {
                return 0;
            }
        });

        return array;
    }
}
