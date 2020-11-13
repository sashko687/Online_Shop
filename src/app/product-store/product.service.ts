import { ProductsStore } from './product.store';
import { FbResponse, Product } from '../shared/interfaces';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class ProductService {
	type = new BehaviorSubject('Phone');
	cartProducts: Product[] = [];
	countProductInCart = new BehaviorSubject(0);
	filterProduct = new BehaviorSubject('');

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

	public remove(id: Product): Observable<Product> {
		return this.http
			.delete(`${environment.fbDbUrl}/products/${id}.json`)
			.pipe(tap(() => this.productStore.remove(id)));
	}

	public setType(type: string): void {
		this.type.next(type);
	}

	addProduct(product: Product): void {
		this.cartProducts.push(product);
		this.countProductInCart.next(this.cartProducts.length);
	}
}
