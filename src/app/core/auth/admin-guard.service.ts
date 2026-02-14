import {Injectable} from "@angular/core";
import {Router} from "@angular/router";
import {Observable, of} from "rxjs";
import {catchError, map} from "rxjs/operators";
import {AuthService} from "./auth.service";

@Injectable({
    providedIn: "root"
})
export class AdminGuardService {
    constructor(
        private readonly router: Router,
        private readonly authService: AuthService
    ) {
    }

    canActivate(): Observable<boolean> {
        if (!this.authService.isLoggedIn()) {
            void this.router.navigate(["/"]).then(() => true);
            return of(false);
        }

        return this.authService.checkAdminStatus().pipe(
            map(response => {
                if (response.isAdmin) {
                    return true;
                }
                void this.router.navigate(["/"]).then(() => true);
                return false;
            }),
            catchError(() => {
                void this.router.navigate(["/"]).then(() => true);
                return of(false);
            })
        );
    }
}
