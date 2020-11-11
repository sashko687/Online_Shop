import { Order } from './../admin/order.interface';
import { OrdersStore } from './../ordersStore/orders.store';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { FbResponse } from './interfaces';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class OrderService {
	constructor(private http: HttpClient, private ordersStore: OrdersStore) {}

	create(order): Observable<Order> {
		return this.http.post(`${environment.fbDbUrl}/orders.json`, order).pipe(
			map((res: FbResponse) => {
				return {
					...order,
					id: res.name,
					date: new Date(order.date),
				};
			}),
			tap((response) => this.ordersStore.upsert(response.name, response))
		);
	}

	getAll(): Observable<Order[]> {
		return this.http.get(`${environment.fbDbUrl}/orders.json`).pipe(
			map((res) => {
				return Object.keys(res).map((key) => ({
					...res[key],
					id: key,
					date: new Date(res[key].date),
				}));
			}),
			tap((response) => this.ordersStore.set(response))
		);
	}

	remove(id: string): Observable<any> {
		return this.http
			.delete(`${environment.fbDbUrl}/orders/${id}.json`)
			.pipe(tap(() => this.ordersStore.remove(id)));
	}
}
