import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const currentUser = this.getToken() ? this.getToken()['token'] : null;
        if (currentUser) {
            if (route.data.roles && route.data.roles.indexOf(this.roleUser()) === -1) {
                // not authorised so return false
                this.router.navigate(['/platform']);
                return false;
            }
            // authorised so return true
            return true;
        }

        // not logged in so redirect to login page 
        this.router.navigate(['/platform']);
        return false;
    }

    private getToken(): number {
        return JSON.parse(localStorage.getItem('user'));
    }

    private returnDataUser(): Object {
        return JSON.parse(localStorage.getItem('user'));
    }

    private roleUser(): string {
        let role = this.returnDataUser()['role'];
        return role;
    }
}