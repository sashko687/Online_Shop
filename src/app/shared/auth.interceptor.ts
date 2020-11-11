import { SessionService } from './../state/session.service';
import { SessionQuery } from './../state/session.query';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
	constructor(private session: SessionService, private router: Router, private sessionQuery: SessionQuery) {}
	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		if (this.sessionQuery.isLoggedIn()) {
			req = req.clone({
				setParams: {
					auth: this.sessionQuery.getToken(),
				},
			});
		}
		return next.handle(req).pipe(
			catchError((err) => {
				if (err.status === 401) {
					this.session.logout();
					this.router.navigate(['/admin', 'login']);
				}
				return throwError(err);
			})
		);
	}
}
