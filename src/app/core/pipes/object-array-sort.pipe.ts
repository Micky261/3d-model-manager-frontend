import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
    name: "objectArraySort"
})
export class ObjectArraySortPipe implements PipeTransform {
    /**
     * Sort the objects by a given field or fields
     *
     * @param array Array of objects to sort
     * @param field Single field as string or multiple fields as array of strings
     * @param descending Sort descending (defaults to false)
     */
    transform<T>(array: T[], field: string | string[], descending = false): T[] {
        if (!Array.isArray(array)) {
            return;
        }
        const fields: string[] = (!Array.isArray(field)) ? [field] : field;

        let descSwitch = 0;
        if (descending === true) {
            descSwitch = 2;
        }

        array.sort((a: any, b: any) => {
            for (let i = 0; i < fields.length; i++) {
                if (a[fields[i]] < b[fields[i]]) {
                    return descSwitch - 1;
                } else if (a[fields[i]] > b[fields[i]]) {
                    return 1 - descSwitch;
                } else {
                    if (fields.length === (i + 1)) { // Last iteration
                        return 0;
                    }
                    // else -> go to loop start
                }
            }
        });

        return array;
    }
}
