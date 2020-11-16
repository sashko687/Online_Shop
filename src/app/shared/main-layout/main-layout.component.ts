import { ProductQuery } from './../../product-store/product.query';
import { BehaviorSubject } from 'rxjs';
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
	countPdoductInCart;
	constructor(public productServ: ProductService, public productQuery: ProductQuery) {}

	ngOnInit(): void {
		this.countPdoductInCart = this.productQuery.selectCartProductsLength();
	}
	applyFilter(event: Event) {
		const filterValue = (event.target as HTMLInputElement).value;
		this.productServ.setSearchString(filterValue);
	}

	toggleBadgeVisibility() {
		this.hidden = !this.hidden;
	}
}
