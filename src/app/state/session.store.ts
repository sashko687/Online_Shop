import { Injectable } from '@angular/core';
import { resetStores, Store, StoreConfig } from '@datorama/akita';

export interface User {
	idToken: string;
}

export interface SessionState {
	user: User | null;
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'session' })
export class SessionStore extends Store {
	constructor() {
		super({ user: null });
	}

	public login(user: User): void {
		this.update({ user });
	}

	public logout(): void {
		resetStores();
	}
}
