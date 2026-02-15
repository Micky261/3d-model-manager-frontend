import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {AuthService} from "./auth.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    private static getCookie(name: string): string {
        const value = `; ${document.cookie}`;

        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(";").shift();
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const locale = localStorage.getItem("locale") || "en-GB";
        req = req.clone({
            setHeaders: { "Accept-Language": locale }
        });

        if (AuthInterceptor.getCookie(AuthService.sessionCookieName)) {
            req = req.clone({
                setParams: {
                    "3DMM_Session": AuthInterceptor.getCookie(AuthService.sessionCookieName)
                }
            });
        }

        return next.handle(req);
    }
}
