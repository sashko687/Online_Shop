import { Component, Input, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ProductService } from '../shared/product.service';

@Component({
	selector: 'app-product',
	templateUrl: './product.component.html',
	styleUrls: ['./product.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductComponent implements OnInit {
	@Input() product;

	constructor(
		private productServ: ProductService,
		private cdr: ChangeDetectorRef
		) {}

	ngOnInit(): void {}

	addProduct(product) {
		this.productServ.addProduct(product);
	}
}
