import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: "invitation-tokens",
                loadChildren: () => import("./invitation-tokens/invitation-tokens.module").then(m => m.InvitationTokensModule)
            }
        ])
    ]
})
export class AdminModule {
}
