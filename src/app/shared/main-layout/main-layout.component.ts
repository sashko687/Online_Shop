import { SessionService } from './../../state/session.service';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/product-store/product.service';

@Component({
	selector: 'app-main-layout',
	templateUrl: './main-layout.component.html',
	styleUrls: ['./main-layout.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainLayoutComponent implements OnInit {
	type = 'Phone';
	hidden = false;
	constructor(public productServ: ProductService) {}

	ngOnInit(): void {}
	applyFilter(event: Event) {
		const filterValue = (event.target as HTMLInputElement).value;
		this.productServ.filterProduct.next(filterValue);
	}

	toggleBadgeVisibility() {
		this.hidden = !this.hidden;
	}

	setType(type) {
		this.productServ.setType(type);
	}
}
