import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        RouterModule.forChild([
            {
                path: "accounts",
                loadChildren: () => import("./accounts/accounts.module").then(m => m.AccountsModule)
            },
        ])
    ]
})
export class ProfileModule {
}
