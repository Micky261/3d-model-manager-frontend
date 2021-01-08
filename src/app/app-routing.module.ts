import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {AuthGuardService} from "./core/auth/auth-guard.service";

@NgModule({
    imports: [RouterModule.forRoot([
        {
            path: "",
            loadChildren: () => import("./home/home.module").then(m => m.HomeModule),
            canActivate: [AuthGuardService]
        }
    ])],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule {
}
