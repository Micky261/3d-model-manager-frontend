import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, Router, RouterStateSnapshot} from "@angular/router";

@Injectable({
    providedIn: "root"
})
export class AuthGuardService {
    constructor(private router: Router) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        if (localStorage.getItem("Token")) {
            return true;
        }

        void this.router.navigate(["/login"], {queryParams: {returnUrl: state.url}}).then(() => true);

        return false;
    }
}
