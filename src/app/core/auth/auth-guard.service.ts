import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, Router, RouterStateSnapshot} from "@angular/router";
import {AuthService} from "./auth.service";

@Injectable({
    providedIn: "root"
})
export class AuthGuardService {
    constructor(
        private readonly router: Router,
        private readonly authService: AuthService
    ) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        if (this.authService.isLoggedIn()) {
            return true;
        } else {
            void this.router.navigate(["/login"], {queryParams: {returnUrl: state.url}}).then(() => true);
            return false;
        }
    }
}
