import { ProductQuery } from './../product-store/product.query';
import { Product } from './../shared/interfaces';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {  Observable } from 'rxjs';
import { ProductService } from '../product-store/product.service';

@Component({
	selector: 'app-main-page',
	templateUrl: './main-page.component.html',
	styleUrls: ['./main-page.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainPageComponent implements OnInit {
	products$: Observable<Product[]>;
	searchProduct$: Observable<string>;
	constructor(public productServ: ProductService, public productQuery: ProductQuery) {}

	ngOnInit(): void {
		this.products$ = this.productQuery.selectProducts();
		this.searchProduct$ = this.productQuery.selectSearch();
		if (!this.productQuery.getHasCache()) {
			this.productServ.getAll().subscribe();
		}
	}
}
