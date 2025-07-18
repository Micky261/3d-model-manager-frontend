import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";
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
            {
                path: "accounts",
                loadChildren: () => import("./accounts/accounts.module").then(m => m.AccountsModule)
            },
        ])
    ]
})
export class ProfileModule {
}
