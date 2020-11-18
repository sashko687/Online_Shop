import { Order } from './../admin/order.interface';
import { EntityStore, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';

export interface OrderState {
	orders: Order[];
}

@StoreConfig({ name: 'orders' })
@Injectable({ providedIn: 'root' })
export class OrdersStore extends EntityStore<OrderState> {
	constructor() {
		super({ orders: [] });
	}
}
