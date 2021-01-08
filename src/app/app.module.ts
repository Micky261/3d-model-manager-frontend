import {registerLocaleData} from "@angular/common";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import localeDe from "@angular/common/locales/de";
import localeEn from "@angular/common/locales/en";
import {APP_INITIALIZER, CUSTOM_ELEMENTS_SCHEMA, NgModule} from "@angular/core";
import {FormsModule} from "@angular/forms";
import {BrowserModule} from "@angular/platform-browser";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {L10nIntlModule, L10nLoader, L10nTranslationModule} from "angular-l10n";
import {ToastNoAnimationModule} from "ngx-toastr";
import {initL10n, l10nConfig} from "../i18n/l10n-config";
import {Storage} from "../i18n/l10n-storage";
import {TranslationLoader} from "../i18n/l10n-translation-loader";
import {NavbarModule} from "../navbar/navbar.module";
import {AppRoutingModule} from "./app-routing.module";
import {AppComponent} from "./app.component";
import {AuthInterceptor} from "./core/auth/auth.interceptor";

registerLocaleData(localeDe);
registerLocaleData(localeEn);

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        FormsModule,
        L10nTranslationModule.forRoot(
            l10nConfig,
            {
                storage: Storage,
                translationLoader: TranslationLoader
            }
        ),
        L10nIntlModule,
        NavbarModule,
        NgbModule,
        ToastNoAnimationModule.forRoot({
            closeButton: true,
            timeOut: 10000,
            extendedTimeOut: 2000,
            easing: "ease-in"
        })
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true,
        },
        {
            provide: APP_INITIALIZER,
            useFactory: initL10n,
            deps: [L10nLoader],
            multi: true
        }
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    bootstrap: [AppComponent]
})
export class AppModule {
}
