import { User } from './session.store';
import { Injectable } from '@angular/core';
import { Query, toBoolean } from '@datorama/akita';
import { filter, map } from 'rxjs/operators';
import { SessionStore, SessionState } from './session.store';


@Injectable({
	providedIn: 'root',
})

export class SessionQuery extends Query<SessionState> {
	isLoggedIn$ = this.select(( {user} ) => toBoolean(user?.idToken));

  	constructor(protected store: SessionStore) {
		super(store);
	}

	isLoggedIn() {
		return toBoolean(this.getValue().user?.idToken);
	}

	getToken(){
		return this.getValue().user?.idToken
	}
}
