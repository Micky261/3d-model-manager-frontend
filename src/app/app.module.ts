import {registerLocaleData} from "@angular/common";
import {HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi} from "@angular/common/http";
import localeDe from "@angular/common/locales/de";
import localeEn from "@angular/common/locales/en";
import { CUSTOM_ELEMENTS_SCHEMA, NgModule, inject, provideAppInitializer } from "@angular/core";
import {FormsModule} from "@angular/forms";
import {BrowserModule} from "@angular/platform-browser";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {NgSelectModule} from "@ng-select/ng-select";
import {L10nIntlModule, L10nLoader, L10nTranslationModule} from "angular-l10n";
import {LazyLoadImageModule} from "ng-lazyload-image";
import {CookieService} from "ngx-cookie-service";
import {MarkdownModule} from "ngx-markdown";
import {ToastNoAnimationModule} from "ngx-toastr";
import {Values} from "ngx-value";
import {FlagsModule} from "nxt-flags";
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
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    bootstrap: [AppComponent],
    imports: [BrowserModule,
        AppRoutingModule,
        NgSelectModule,
        FormsModule,
        L10nTranslationModule.forRoot(l10nConfig, {
            storage: Storage,
            translationLoader: TranslationLoader
        }),
        L10nIntlModule,
        NavbarModule,
        NgbModule,
        ToastNoAnimationModule.forRoot({
            closeButton: true,
            timeOut: 7000,
            extendedTimeOut: 1000,
            easing: "ease-in"
        }),
        FlagsModule,
        MarkdownModule.forRoot(),
        LazyLoadImageModule
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true,
        },
        provideAppInitializer(() => {
            const initializerFn = (initL10n)(inject(L10nLoader));
            return initializerFn();
        }),
        provideAppInitializer(() => {
            const initializerFn = (() => () => Values("config/configuration.json"))();
            return initializerFn();
        }),
        CookieService,
        provideHttpClient(withInterceptorsFromDi())
    ]
})
export class AppModule {
}
