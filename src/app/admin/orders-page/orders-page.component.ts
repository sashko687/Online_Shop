import { Order } from './../order.interface';
import { OrdersQuery } from './../../orders-store/orders.query';
import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy, ViewChild } from '@angular/core';
import { Observable, Subject, Subscription } from 'rxjs';
import { OrderService } from 'src/app/orders-store/order.service';
import { takeUntil } from 'rxjs/operators';

@Component({
	selector: 'app-orders-page',
	templateUrl: './orders-page.component.html',
	styleUrls: ['./orders-page.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrdersPageComponent implements OnInit, OnDestroy {
	displayedColumns: string[] = ['date', 'phone', 'name', 'address', 'orders', 'price', 'status'];
	orders: Order[] = [];
	orders$: Observable<Order[]>;
	private pSub$ = new Subject();
	loading = false;

	constructor(private orderServ: OrderService, private ordersQuery: OrdersQuery) {}

	ngOnInit() {
		this.orders$ = this.ordersQuery.selectOrders();
		if (!this.ordersQuery.getHasCache()) {
			this.orderServ.getAll().subscribe();
		}
	}

	ngOnDestroy() {
		this.pSub$.next();
		this.pSub$.complete();
	}

	public remove(id): void {
		this.orderServ.remove(id).pipe(takeUntil(this.pSub$)).subscribe();
	}
}
