import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        RouterModule.forChild([
            {
                path: "list",
                loadChildren: () => import("./list/list.module").then(m => m.ListModule)
            },
            { // Must be last
                path: ":id",
                loadChildren: () => import("./show/show.module").then(m => m.ShowModule)
            }
        ])
    ]
})
export class CollectionModule {
}
