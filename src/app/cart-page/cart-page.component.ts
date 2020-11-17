import { Order } from './../admin/order.interface';
import { ProductQuery } from './../product-store/product.query';
import { takeUntil, map, take } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Product } from './../shared/interfaces';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ProductService } from '../product-store/product.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { OrderService } from '../orders-store/order.service';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Component({
	selector: 'app-cart-page',
	templateUrl: './cart-page.component.html',
	styleUrls: ['./cart-page.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartPageComponent implements OnInit {
	cartProducts$: Observable<Product[]>;
	totalPrice$: Observable<number>;
	unSub = new Subject();
	displayedColumns = ['type', 'title', 'actions', 'price'];

	form: FormGroup;
	submitted = new BehaviorSubject(false);

	constructor(
		private productServ: ProductService,
		private orderServ: OrderService,
		private router: Router,
		private productQuery: ProductQuery
	) {}

	ngOnInit() {
		this.cartProducts$ = this.productQuery.selectCartProduct();
		this.totalPrice$ = this.cartProducts$.pipe(map((list) => list.reduce((acc, value) => (acc += +value.price), 0)));
		this.form = new FormGroup({
			name: new FormControl(null, Validators.required),
			phone: new FormControl(null, Validators.required),
			address: new FormControl(null, Validators.required),
			payment: new FormControl('Cash'),
		});
	}

	public submit(): void {
		if (this.form.invalid) {
			return;
		}

		this.submitted.next(true);

		const order = {
			name: this.form.value.name,
			phone: this.form.value.phone,
			address: this.form.value.address,
			payment: this.form.value.payment,
			orders: this.productQuery.getValue().cartProducts,
			price: this.productQuery.getValue().cartProducts.reduce((acc,value)=> acc += +value.price, 0),
			date: new Date(),
		};
		this.orderServ
			.create(order)
			.pipe(takeUntil(this.unSub))
			.subscribe(() => {
				this.productServ.setCartEmpty();
				this.submitted.next(false);
				this.form.reset();
				this.router.navigate(['/success']);
			});
	}

	public delete(product: Product): void {
		this.productServ.deleteProduct(product);
	}

	ngOnDestroy() {
		this.unSub.next();
		this.unSub.complete();
	}
}
