import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SessionStore, User } from './session.store';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SessionService {
	constructor(private authStore: SessionStore, private http: HttpClient) {}

	public login(userData: { email: string; password: string; returnSecureToken: boolean }): Observable<User> {
		return this.http
			.post(
				'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + environment.apiKey,
				userData
			)
			.pipe(tap((user: User) => this.authStore.login(user)));
	}

	public logout(): void {
		this.authStore.logout();
	}
}
