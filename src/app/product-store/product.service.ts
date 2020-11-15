import { state } from '@angular/animations';
import { Product } from './../shared/interfaces';
import { ProductsStore } from './product.store';
import { FbResponse } from '../shared/interfaces';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, tap, filter } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class ProductService {
	constructor(private http: HttpClient, private productStore: ProductsStore) {}

	public create(product: Product): Observable<Product> {
		return this.http.post(`${environment.fbDbUrl}/products.json`, product).pipe(
			map((res: FbResponse) => {
				return {
					...product,
					id: res.name,
					date: new Date(product.date),
				};
			}),
			tap((response) => this.productStore.upsert(response.id, response))
		);
	}

	public getAll(): Observable<Product[]> {
		return this.http.get(`${environment.fbDbUrl}/products.json`).pipe(
			map((res) => {
				return Object.keys(res).map((key) => ({
					...res[key],
					id: key,
					date: new Date(res[key].date),
				}));
			}),
			tap((response) => this.productStore.set(response))
		);
	}

	public getById(id: string): Observable<any> {
		return this.http.get(`${environment.fbDbUrl}/products/${id}.json`).pipe(
			map((res: Product) => {
				return { ...res, id, date: new Date(res.date) };
			}),
			tap((response) => this.productStore.update(response))
		);
	}

	public update(product: Product): Observable<Product> {
		return this.http
			.patch(`${environment.fbDbUrl}/products/${product.id}.json`, product)
			.pipe(tap(() => this.productStore.update(product.id, product)));
	}

	public remove(id: string): Observable<Product> {
		return this.http
			.delete(`${environment.fbDbUrl}/products/${id}.json`)
			.pipe(tap(() => this.productStore.remove(id)));
	}

	public addProduct(product: Product): void {
		this.productStore.update((state) => ({
			...state,
			cartProducts: [...state.cartProducts, product],
		}));
	}

	public deleteProduct(product: Product): void {
		this.productStore.update((state) => ({
			...state,
			cartProducts: resolve(state.cartProducts, product),
		}));
	}

	public setCartEmpty() {
		this.productStore.update({ cartProducts: [] });
	}

	public setSearchString(value: string) {
		this.productStore.update({ searchString: value });
	}
}

function resolve(state: Product[], product: Product) {
	const ids = state.filter((prod) => prod.id === product.id);
	const notId = state.filter((prod) => prod.id !== product.id);
	ids.shift();
	return notId.concat(ids);
}
