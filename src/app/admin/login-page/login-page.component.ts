import { AuthService } from './../../shared/auth.service';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
	selector: 'app-login-page',
	templateUrl: './login-page.component.html',
	styleUrls: ['./login-page.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginPageComponent implements OnInit {
	form: FormGroup;
	submited: boolean;

	constructor(public auth: AuthService, public router: Router) {}

	ngOnInit(): void {
		this.form = new FormGroup({
			email: new FormControl(null, [Validators.required, Validators.email]),
			password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
		});
	}
	submit() {
		if (this.form.invalid) {
			return;
		}

		this.submited = true;

		const user = {
			email: this.form.value.email,
			password: this.form.value.password,
			returnSecureToken: true,
		};
		this.auth.login(user).subscribe(
			(res) => {
				this.form.reset();
				this.router.navigate(['/admin', 'dashboard']);
				this.submited = false;
			},
			() => {
				this.submited = false;
			}
		);
	}
}
