import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        RouterModule.forChild([
            {
                path: "",
                loadChildren: () => import("./show/profile-show.module").then(m => m.ProfileShowModule)
            },
        ])
    ]
})
export class ProfileModule {
}
