import { takeUntil } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Product } from './../shared/interfaces';
import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ProductService } from '../product-store/product.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { OrderService } from '../orders-store/order.service';
import { BehaviorSubject, Observable, Subject, Subscription } from 'rxjs';
import { DataSource } from '@angular/cdk/table';

@Component({
	selector: 'app-cart-page',
	templateUrl: './cart-page.component.html',
	styleUrls: ['./cart-page.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartPageComponent implements OnInit {
	cartProducts = [];
	totalPrice = 0;
	added = '';
	unSub = new Subject();
	displayedColumns = ['type', 'title', 'actions', 'price'];

	dataSource = new BehaviorSubject([]);

	form: FormGroup;
	submitted = false;

	constructor(
		private productServ: ProductService,
		private orderServ: OrderService,
		private cdr: ChangeDetectorRef,
		private router: Router
	) {}

	ngOnInit() {
		this.cartProducts = this.productServ.cartProducts;
		this.cartProducts.forEach((i) => {
			this.totalPrice += +i.price;
		});
		this.dataSource.next(this.cartProducts);

		this.form = new FormGroup({
			name: new FormControl(null, Validators.required),
			phone: new FormControl(null, Validators.required),
			address: new FormControl(null, Validators.required),
			payment: new FormControl('Cash'),
		});
	}

	submit() {
		if (this.form.invalid) {
			return;
		}

		this.submitted = true;

		const order = {
			name: this.form.value.name,
			phone: this.form.value.phone,
			address: this.form.value.address,
			payment: this.form.value.payment,
			orders: this.cartProducts,
			price: this.totalPrice,
			date: new Date(),
		};

		this.orderServ.create(order).pipe(takeUntil(this.unSub)).subscribe((res) => {
			this.productServ.cartProducts = [];
			this.added = 'Delivery is framed!';
			this.submitted = false;
			this.form.reset();
			this.router.navigate(['/success']);
		});
	}

	delete(product) {
		this.totalPrice -= +product.price;
		this.cartProducts.splice(this.cartProducts.indexOf(product), 1);
		this.dataSource.next(this.cartProducts);
		this.productServ.countProductInCart.next(this.cartProducts.length);
		this.cdr.detectChanges();
	}

	ngOnDestroy() {
		this.unSub.next();
		this.unSub.complete();
	}
}
