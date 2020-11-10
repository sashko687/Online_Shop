import { SessionService } from './../state/session.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { SessionQuery } from '../state/session.query';

@Injectable({
	providedIn: 'root',
})
export class AuthGuard implements CanActivate {
	constructor(private session: SessionService, private sessionQuery: SessionQuery, private router: Router) {}
	canActivate(
		route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot
	): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
		if (this.sessionQuery.isLoggedIn()) {
			return true;
		} else {
			this.session.logout();
			this.router.navigate(['/admin', 'login']);
		}
	}
}
