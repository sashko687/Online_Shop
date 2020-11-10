import { FbResponse, Product } from './interfaces';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class ProductService {
	type = new BehaviorSubject('Phone');
	cartProducts: Product[] = [];

	constructor(private http: HttpClient) {}

	public create(product: Product): Observable<Product> {
		return this.http.post(`${environment.fbDbUrl}/products.json`, product).pipe(
			map((res: FbResponse) => {
				return {
					...product,
					id: res.name,
					date: new Date(product.date),
				};
			})
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
			})
		);
	}

	public getById(id: Product): Observable<any> {
		return this.http.get(`${environment.fbDbUrl}/products/${id}.json`).pipe(
			map((res: Product) => {
				return { ...res, id, date: new Date(res.date) };
			})
		);
	}

	public remove(id: Product): Observable<Product> {
		return this.http.delete(`${environment.fbDbUrl}/products/${id}.json`);
	}

	public update(product: Product): Observable<Product> {
		return this.http.patch(`${environment.fbDbUrl}/products/${product.id}.json`, product);
	}

	public setType(type: string): void {
		this.type.next(type);
	}

	addProduct(product: Product): void {
		this.cartProducts.push(product);
	}
}
