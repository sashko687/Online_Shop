import { Injectable } from '@angular/core';
import {  QueryEntity } from '@datorama/akita';
import { Observable } from 'rxjs';
import { Order } from '../admin/order.interface';
import { OrdersStore, OrderState } from './orders.store';

@Injectable({ providedIn: 'root' })
export class OrdersQuery extends QueryEntity<OrderState, Order> {
	constructor(protected store: OrdersStore) {
		super(store);
	}

public 	selectOrders(): Observable<Order[]> {
		return this.selectAll();
	}



}
