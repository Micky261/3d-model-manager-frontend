import {NgModule} from "@angular/core";
import {ArraySortPipe} from "./array-sort.pipe";
import {ObjectArraySortPipe} from "./object-array-sort.pipe";

@NgModule({
    declarations: [
        ObjectArraySortPipe,
        ArraySortPipe
    ],
    exports: [
        ObjectArraySortPipe,
        ArraySortPipe
    ]
})
export class CustomPipesModule {
}
