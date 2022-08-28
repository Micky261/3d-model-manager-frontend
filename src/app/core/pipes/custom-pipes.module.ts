import {NgModule} from "@angular/core";
import {ArraySortPipe} from "./array-sort.pipe";
import {ObjectArraySortPipe} from "./object-array-sort.pipe";
import {PascalCasePipe} from "./pascal-case.pipe";
import {SecurePipe} from "./secure.pipe";
import {FileSizePipe} from "./filesize.pipe";

@NgModule({
    declarations: [
        ObjectArraySortPipe,
        ArraySortPipe,
        PascalCasePipe,
        SecurePipe,
        FileSizePipe
    ],
    exports: [
        ObjectArraySortPipe,
        ArraySortPipe,
        PascalCasePipe,
        SecurePipe,
        FileSizePipe
    ]
})
export class CustomPipesModule {
}
