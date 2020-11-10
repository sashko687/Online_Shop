import { Injectable } from '@angular/core';
import { ID } from '@datorama/akita';
import { HttpClient } from '@angular/common/http';
import { SessionStore, User } from './session.store';
import { Session } from './session.model';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class SessionService {
	constructor(
		private authStore: SessionStore,
		private http: HttpClient
	) {}

	login(User) {
		return this.http
			.post(
				'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + environment.apiKey,
				User
			)
			.pipe(tap((user: User) => this.authStore.login(user)));
	}

	logout() {
		this.authStore.logout();
	}
}
