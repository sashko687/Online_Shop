import { User } from './session.store';
import { Injectable } from '@angular/core';
import { Query, toBoolean } from '@datorama/akita';
import { filter, map } from 'rxjs/operators';
import { SessionStore, SessionState } from './session.store';


@Injectable({
	providedIn: 'root',
})

export class SessionQuery extends Query<User> {
	isLoggedIn$ = this.select(( user ) => toBoolean(user));

	loggedInUser$ = this.select().pipe(
		filter(( user ) => toBoolean(user)),
		map(( {  idToken }) => `${idToken}`)
	);

	constructor(protected store: SessionStore) {
		super(store);
	}

	isLoggedIn() {
		return toBoolean(this.getValue().idToken);
	}

	getToken(){
		return this.getValue().idToken
	}
}
