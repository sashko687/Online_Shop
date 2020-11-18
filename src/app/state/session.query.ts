import { User } from './session.store';
import { Injectable } from '@angular/core';
import { Query, toBoolean } from '@datorama/akita';
import { SessionStore, SessionState } from './session.store';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class SessionQuery extends Query<SessionState> {
	public isLoggedIn$: Observable<boolean> = this.select(({ user }) => toBoolean(user?.idToken));

	constructor(protected store: SessionStore) {
		super(store);
	}

	public isLoggedIn(): boolean {
		return toBoolean(this.getValue().user?.idToken);
	}

	public getToken(): string {
		return this.getValue().user?.idToken;
	}
}
