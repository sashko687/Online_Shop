import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { Observable } from 'rxjs';
import { Order } from '../admin/order.interface';
import { ProductsStore, ProductState } from './product.store';

@Injectable({ providedIn: 'root' })
export class OrdersQuery extends QueryEntity<ProductState, Order> {
	constructor(protected store: ProductsStore) {
		super(store);
	}

	selectProducts(): Observable<Order[]> {
		return this.selectAll();
	}

	selectLoaded(): Observable<boolean> {
		return this.select((state) => state.isLoaded);
	}
}
