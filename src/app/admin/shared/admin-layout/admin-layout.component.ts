import { SessionService } from './../../../state/session.service';
import { Session } from './../../../state/session.model';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
	selector: 'app-admin-layout',
	templateUrl: './admin-layout.component.html',
	styleUrls: ['./admin-layout.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminLayoutComponent implements OnInit {
	constructor(public session: SessionService, public router: Router) {}

	ngOnInit(): void {}
	logout(event) {
		event.preventDefault();
		this.session.logout();
		this.router.navigate(['/admin', 'login']);
		localStorage.clear();
	}
}
