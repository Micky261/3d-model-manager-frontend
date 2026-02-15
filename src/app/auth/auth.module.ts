import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";

@NgModule({
    imports: [
        RouterModule.forChild([
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
        ])
    ]
})
export class AuthModule {
}
