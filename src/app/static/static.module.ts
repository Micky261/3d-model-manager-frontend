import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild([
            {
                path: "not-found",
                loadChildren: () => import("./not-found/not-found.module").then(m => m.NotFoundModule)
            }
        ])
    ]
})
export class StaticModule {
}
