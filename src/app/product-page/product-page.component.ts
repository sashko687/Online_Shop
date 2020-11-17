import { ProductQuery } from './../product-store/product.query';
import { Product } from './../shared/interfaces';
import { ProductService } from 'src/app/product-store/product.service';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
	selector: 'app-product-page',
	templateUrl: './product-page.component.html',
	styleUrls: ['./product-page.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductPageComponent implements OnInit {
	product$: Observable<Product>;

	constructor(
		private productServ: ProductService,
		private productQuery: ProductQuery,
		private route: ActivatedRoute
	) {}

	ngOnInit(): void {
		this.product$ = this.route.params.pipe(switchMap((params) => this.productQuery.selectProduct(params.id)));
	}

	public addProduct(product: Product): void {
		this.productServ.addProduct(product);
	}
}
