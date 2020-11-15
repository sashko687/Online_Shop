import { state } from '@angular/animations';
import { Product } from './../shared/interfaces';
import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { Observable } from 'rxjs';
import { ProductsStore, ProductState } from './product.store';

@Injectable({ providedIn: 'root' })
export class ProductQuery extends QueryEntity<ProductState, Product> {
	constructor(protected store: ProductsStore) {
		super(store);
	}

	selectProducts(): Observable<Product[]> {
		return this.selectAll();
	}

	selectProduct(id: string): Observable<Product> {
		return this.selectEntity(id);
	}

	selectCartProduct(): Observable<Product[]> {
		return this.select((state) => state..filter((product) => {
			return product.title.toLowerCase().includes(state.searchString.toLowerCase());
		}));
	}

	selectCartProductsLength() {
		return this.select((state) => state.cartProducts?.length);
	}

	selectSearch(): Observable<string> {
		return this.select((state) => state.searchString);
	}
}
