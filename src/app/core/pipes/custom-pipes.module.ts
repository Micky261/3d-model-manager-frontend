import {NgModule} from "@angular/core";
import {ArraySortPipe} from "./array-sort.pipe";
import {ObjectArraySortPipe} from "./object-array-sort.pipe";
import {PascalCasePipe} from "./pascal-case.pipe";
import {SecurePipe} from "./secure.pipe";

@NgModule({
    declarations: [
        ObjectArraySortPipe,
        ArraySortPipe,
        PascalCasePipe,
        SecurePipe
    ],
    exports: [
        ObjectArraySortPipe,
        ArraySortPipe,
        PascalCasePipe,
        SecurePipe
    ]
})
export class CustomPipesModule {
}
