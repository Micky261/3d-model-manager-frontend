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
    transform<T>(array: T[], field: string | string[], descending: boolean | boolean[] = false): T[] {
        if (!Array.isArray(array)) {
            return;
        }
        const fields: string[] = (!Array.isArray(field)) ? [field] : field;
        const descendings: boolean[] = (!Array.isArray(descending)) ? [descending] : descending;

        if (fields.length === 0) {
            return array;
        }

        array.sort((a: any, b: any) => {
            for (let i = 0; i < fields.length; i++) {
                let descSwitch = 0;
                if (descendings.length === 1) {
                    // Only one given -> Apply to all
                    descSwitch = (descendings[0]) ? 2 : 0;
                } else {
                    // Multiple ones given -> Apply to corresponding field
                    // If too less given it defaults to ascending
                    descSwitch = (descendings[i]) ? 2 : 0;
                }

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
