import { Order } from './../admin/order.interface';
import { EntityStore, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';

export interface OrderState {
	orders: Order[];
	isLoaded: boolean;
}

export function createInitialState(): OrderState {
	return {
		orders: [],
		isLoaded: false,
	};
}

@StoreConfig({ name: 'orders' })
@Injectable({ providedIn: 'root' })
export class OrdersStore extends EntityStore<OrderState> {
	constructor() {
		super(createInitialState());
	}
}
