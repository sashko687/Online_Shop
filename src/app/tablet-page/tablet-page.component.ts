import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductQuery } from '../product-store/product.query';
import { ProductService } from '../product-store/product.service';
import { Product } from '../shared/interfaces';

@Component({
	selector: 'app-tablet-page',
	templateUrl: './tablet-page.component.html',
	styleUrls: ['./tablet-page.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabletPageComponent implements OnInit {
	public products$: Observable<Product[]>;
	public searchProduct$: Observable<string>;

	constructor(public productServ: ProductService, public productQuery: ProductQuery) {}

	ngOnInit(): void {
		this.products$ = this.productQuery.selectProducts();
		this.searchProduct$ = this.productQuery.selectSearch();
		if (!this.productQuery.getHasCache()) {
			this.productServ.getAll().subscribe();
		}
	}
}
