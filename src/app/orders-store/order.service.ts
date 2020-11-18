import { Order } from './../admin/order.interface';
import { OrdersStore } from './orders.store';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { FbResponse } from '../shared/interfaces';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class OrderService {
	private baseUrl = environment.fbDbUrl;
	constructor(private http: HttpClient, private ordersStore: OrdersStore) {}

	public create(order: Order): Observable<Order> {
		return this.http.post(`${this.baseUrl}/orders.json`, order).pipe(
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

	public getAll(): Observable<Order[]> {
		return this.http.get(`${this.baseUrl}/orders.json`).pipe(
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

	public remove(id: string): Observable<Order> {
		return this.http.delete(`${this.baseUrl}/orders/${id}.json`).pipe(tap(() => this.ordersStore.remove(id)));
	}
}
