import {NgModule} from "@angular/core";
import {ArraySortPipe} from "./array-sort.pipe";
import {ObjectArraySortPipe} from "./object-array-sort.pipe";
import {SecurePipe} from "./secure.pipe";

@NgModule({
    declarations: [
        ObjectArraySortPipe,
        ArraySortPipe,
        SecurePipe
    ],
    exports: [
        ObjectArraySortPipe,
        ArraySortPipe,
        SecurePipe
    ]
})
export class CustomPipesModule {
}
