import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {AdminGuardService} from "./core/auth/admin-guard.service";
import {AuthGuardService} from "./core/auth/auth-guard.service";

@NgModule({
    imports: [
        RouterModule.forRoot(
            [
                {
                    path: "",
                    loadChildren: () => import("./home/home.module").then(m => m.HomeModule),
                    canActivate: [AuthGuardService]
                },
                {
                    path: "static",
                    loadChildren: () => import("./static/static.module").then(m => m.StaticModule)
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
                    path: "email-verify",
                    loadChildren: () => import("./email-verify/email-verify.module").then(m => m.EmailVerifyModule)
                },
                {
                    path: "forgot-password",
                    loadChildren: () => import("./forgot-password/forgot-password.module").then(m => m.ForgotPasswordModule)
                },
                {
                    path: "password-reset",
                    loadChildren: () => import("./password-reset/password-reset.module").then(m => m.PasswordResetModule)
                },
                {
                    path: "model",
                    loadChildren: () => import("./model/model.module").then(m => m.ModelModule)
                },
                {
                    path: "collection",
                    loadChildren: () => import("./collection/collection.module").then(m => m.CollectionModule)
                },
                {
                    path: "search",
                    loadChildren: () => import("./search/search.module").then(m => m.SearchModule)
                },
                {
                    path: "tags",
                    loadChildren: () => import("./tags/tags.module").then(m => m.TagsModule)
                },
                {
                    path: "profile",
                    loadChildren: () => import("./profile/profile.module").then(m => m.ProfileModule)
                },
                {
                    path: "admin",
                    loadChildren: () => import("./admin/admin.module").then(m => m.AdminModule),
                    canActivate: [AdminGuardService]
                }
            ]
        )
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule {
}
