import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        RouterModule.forChild([
            {
                path: "models",
                loadChildren: () => import("./search-models/search-models.module").then(m => m.SearchModelsModule)
            }
        ])
    ]
})
export class SearchModule {
}
