import { Order } from './../order.interface';
import { OrdersQuery } from './../../orders-store/orders.query';
import { Component, OnInit, ChangeDetectionStrategy, OnDestroy} from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { OrderService } from 'src/app/orders-store/order.service';
import { takeUntil } from 'rxjs/operators';

@Component({
	selector: 'app-orders-page',
	templateUrl: './orders-page.component.html',
	styleUrls: ['./orders-page.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrdersPageComponent implements OnInit, OnDestroy {
public	displayedColumns: string[] = ['date', 'phone', 'name', 'address', 'orders', 'price', 'status'];
public	orders$: Observable<Order[]>;
private	pSub$ = new Subject();

	constructor(private orderServ: OrderService, private ordersQuery: OrdersQuery) {}

	ngOnInit(): void {
		this.orders$ = this.ordersQuery.selectOrders();
		if (!this.ordersQuery.getHasCache()) {
			this.orderServ.getAll().subscribe();
		}
	}

	ngOnDestroy(): void {
		this.pSub$.next();
		this.pSub$.complete();
	}

	public remove(id: string): void {
		this.orderServ.remove(id).pipe(takeUntil(this.pSub$)).subscribe();
	}
}
