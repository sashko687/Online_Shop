import { Product } from './../shared/interfaces';
import { Component, Input, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ProductService } from '../product-store/product.service';

@Component({
	selector: 'app-product',
	templateUrl: './product.component.html',
	styleUrls: ['./product.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductComponent implements OnInit {
	@Input() product: Product;

	constructor(
		private productServ: ProductService,
		) {}

	ngOnInit(): void {}

public addProduct(product : Product):  void{
		this.productServ.addProduct(product);
	}
}
