import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
    name: "objectArraySort"
})
export class ObjectArraySortPipe implements PipeTransform {
    transform<T>(array: T[], field: string, descending: boolean): T[] {
        if (!Array.isArray(array)) {
            return;
        }

        let descSwitch = 0;
        if (descending === true) {
            descSwitch = 2;
        }

        array.sort((a: any, b: any) => {
            if (a[field] < b[field]) {
                return descSwitch - 1;
            } else if (a[field] > b[field]) {
                return 1 - descSwitch;
            } else {
                return 0;
            }
        });

        return array;
    }
}
