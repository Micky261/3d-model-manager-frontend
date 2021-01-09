import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {AuthGuardService} from "./core/auth/auth-guard.service";

@NgModule({
    imports: [RouterModule.forRoot([
        {
            path: "",
            loadChildren: () => import("./home/home.module").then(m => m.HomeModule),
            canActivate: [AuthGuardService]
        },
        {
            path: "login",
            loadChildren: () => import("./login/login.module").then(m => m.LoginModule)
        },
        {
            path: "register",
            loadChildren: () => import("./register/register.module").then(m => m.RegisterModule)
        },
        {
            path: "email-resend",
            loadChildren: () => import("./email-resend/email-resend.module").then(m => m.EmailResendModule)
        },
        {
            path: "model",
            loadChildren: () => import("./model/model.module").then(m => m.ModelModule)
        }
    ])],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule {
}
