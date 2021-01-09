import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild([
            {
                path: "create",
                loadChildren: () => import("./create-model/create-model.module").then(m => m.CreateModelModule)
            },
            { // Must be last
                path: ":id",
                loadChildren: () => import("./show/show.module").then(m => m.ShowModule)
            }
        ]),
    ]
})
export class ModelModule {
}
