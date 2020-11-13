import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductQuery } from '../product-store/product.query';
import { ProductService } from '../product-store/product.service';
import { Product } from '../shared/interfaces';

@Component({
  selector: 'app-laptop-page',
  templateUrl: './laptop-page.component.html',
  styleUrls: ['./laptop-page.component.scss']
})
export class LaptopPageComponent implements OnInit {
	products$: Observable<Product[]>;
	constructor(
		public productServ: ProductService,
		public productQuery: ProductQuery,
		) {}

	ngOnInit(): void {
		this.products$ = this.productQuery.selectProducts()
		if (!this.productQuery.getHasCache()) {
			this.productServ.getAll().subscribe();
		}
	}
}
