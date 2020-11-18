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
	public logged: Observable<boolean>;

	constructor(public sessionServ: SessionService, public sessionQuery: SessionQuery, public router: Router) {}

	ngOnInit(): void {
		this.logged = this.sessionQuery.isLoggedIn$;
	}

	public logout(event: MouseEvent): void {
		event.preventDefault();
		this.sessionServ.logout();
		this.router.navigate(['/admin', 'login']);
	}
}
