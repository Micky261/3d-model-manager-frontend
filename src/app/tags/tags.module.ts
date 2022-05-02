import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild([
            {
                path: "list",
                loadChildren: () => import("./tag-list/tag-list.module").then(m => m.TagListModule)
            }
        ])
    ]
})
export class TagsModule {
}
