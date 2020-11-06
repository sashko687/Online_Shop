import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { OrderService } from 'src/app/shared/order.service';
import { ProductService } from 'src/app/shared/product.service';

@Component({
	selector: 'app-orders-page',
	templateUrl: './orders-page.component.html',
	styleUrls: ['./orders-page.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrdersPageComponent implements OnInit {
	orders = [];
	pSub: Subscription;
	rSub: Subscription;

	constructor(
		private orderServ: OrderService,
		private cdr: ChangeDetectorRef) {}

	ngOnInit() {
		this.pSub = this.orderServ.getAll().subscribe((orders) => {
			this.orders = orders;
			this.cdr.detectChanges();
		});
	}

	ngOnDesroy() {
		if (this.pSub) {
			this.pSub.unsubscribe();
		}

		if (this.rSub) {
			this.rSub.unsubscribe();
		}
	}

	remove(id) {
		this.rSub = this.orderServ.remove(id).subscribe(() => {
			this.orders = this.orders.filter((orders) => orders.id !== id);
		});
	}
}
