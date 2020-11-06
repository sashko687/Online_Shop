import { Product } from './../shared/interfaces';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ProductService } from '../shared/product.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { OrderService } from '../shared/order.service';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { DataSource } from '@angular/cdk/table';

@Component({
	selector: 'app-cart-page',
	templateUrl: './cart-page.component.html',
	styleUrls: ['./cart-page.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class CartPageComponent implements OnInit {
	cartProducts = [];
	totalPrice = 0;
	added = '';
	unSub: Subscription;
	displayedColumns = ['type', 'title','actions', 'price'];

	dataSource

	form: FormGroup;
	submitted = false;

	constructor(private productServ: ProductService, private orderServ: OrderService) {}

	ngOnInit() {
		this.cartProducts = this.productServ.cartProducts;
		this.cartProducts.forEach((i) => {
			this.totalPrice += +i.price;
		});
	   console.log(this.cartProducts)
		this.dataSource= this.cartProducts;

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

		this.unSub = this.orderServ.create(order).subscribe((res) => {
			this.added = 'Delivery is framed!';
			this.submitted = false;
			this.form.reset();
		});
	}

	delete(product) {
		this.totalPrice -= +product.price;
		this.cartProducts.splice(this.cartProducts.indexOf(product), 1);
	}

	ngOnDestroy(){
	if(this.unSub){
		this.unSub.unsubscribe();
	}
	}
}
