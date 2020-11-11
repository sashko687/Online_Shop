import { User } from './../../../state/session.store';
import { SessionService } from './../../../state/session.service';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SessionQuery } from 'src/app/state/session.query';
import { Observable } from 'rxjs';

@Component({
	selector: 'app-admin-layout',
	templateUrl: './admin-layout.component.html',
	styleUrls: ['./admin-layout.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminLayoutComponent implements OnInit {
	constructor(public sessionServ: SessionService, public sessionQuery: SessionQuery, public router: Router) {}
	logged: Observable<any>;
	ngOnInit(): void {
		this.logged = this.sessionQuery.isLoggedIn$;
	}
	logout(event) {
		event.preventDefault();
		this.sessionServ.logout();
		this.router.navigate(['/admin', 'login']);
		localStorage.clear();
	}
}
