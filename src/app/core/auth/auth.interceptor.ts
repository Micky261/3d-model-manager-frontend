import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (localStorage.getItem("Token") != null) {
            req = req.clone({
                setHeaders: {
                    "Authorization": `Bearer ${localStorage.getItem("Token")}`,
                },
            });

            return next.handle(req);
        } else {
            return next.handle(req);
        }
    }
}
