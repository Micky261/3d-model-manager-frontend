import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: "users",
                loadChildren: () => import("./user-management/user-management.module").then(m => m.UserManagementModule)
            },
            {
                path: "invitation-tokens",
                loadChildren: () => import("./invitation-tokens/invitation-tokens.module").then(m => m.InvitationTokensModule)
            }
        ])
    ]
})
export class AdminModule {
}
