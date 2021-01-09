import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {AuthService} from "./auth.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (localStorage.getItem(AuthService.localStorageTokenKey) != null) {
            req = req.clone({
                setHeaders: {
                    // eslint-disable-next-line @typescript-eslint/naming-convention
                    "Authorization": `Bearer ${localStorage.getItem(AuthService.localStorageTokenKey)}`,
                },
            });

            return next.handle(req);
        } else {
            return next.handle(req);
        }
    }
}
