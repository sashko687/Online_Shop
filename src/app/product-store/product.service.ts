import { Product } from './../shared/interfaces';
import { ProductsStore } from './product.store';
import { FbResponse } from '../shared/interfaces';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class ProductService {
	private baseUrl = environment.fbDbUrl;

	constructor(private http: HttpClient, private productStore: ProductsStore) {}

	public create(product: Product): Observable<Product> {
		return this.http.post(`${this.baseUrl}/products.json`, product).pipe(
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
		return this.http.get(`${this.baseUrl}/products.json`).pipe(
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
		return this.http.get(`${this.baseUrl}/products/${id}.json`).pipe(
			map((res: Product) => {
				return { ...res, id, date: new Date(res.date) };
			}),
			tap((response) => this.productStore.update(response))
		);
	}

	public update(product: Product): Observable<Product> {
		return this.http
			.patch(`${this.baseUrl}/products/${product.id}.json`, product)
			.pipe(tap(() => this.productStore.update(product.id, product)));
	}

	public remove(id: string): Observable<Product> {
		return this.http.delete(`${this.baseUrl}/products/${id}.json`).pipe(tap(() => this.productStore.remove(id)));
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
			cartProducts: this.resolveNewListProductInCart(state.cartProducts, product),
		}));
	}

	public setCartEmpty(): void {
		this.productStore.update({ cartProducts: [] });
	}

	public setSearchString(value: string): void {
		this.productStore.update({ searchString: value });
	}

	private resolveNewListProductInCart(state: Product[], product: Product): Product[] {
		const newState: Product[] = [];
		let idRemove = product.id;
		state.forEach((item) => {
			item.id === idRemove ? (idRemove = null) : newState.push(item);
		});
		return newState;
	}
}
