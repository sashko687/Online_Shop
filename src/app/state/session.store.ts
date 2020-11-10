import { Injectable } from '@angular/core';
import { ID, Store, StoreConfig } from '@datorama/akita';

export interface User {
	idToken: string;
}

export interface SessionState {
	user: User | null;
}

export function createInitialState(): SessionState {
	return {
		user: null,
	};
}

export function createSession(user: User) {
	return { ...user };
}
@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'session' })
export class SessionStore extends Store {
	constructor() {
		super(createInitialState());
	}

	login(data: User) {
		const user = createSession(data);
		this.update({ user });
	}

	logout() {
		this.update(createInitialState());
	}
}
