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

public	selectProducts(): Observable<Product[]> {
		return this.selectAll();
	}

public	selectProduct(id: string): Observable<Product> {
		return this.selectEntity(id);
	}

public	selectCartProduct(): Observable<Product[]> {
		return this.select((state) => state.cartProducts);
	}

public	selectCartProductsLength(): Observable<number> {
		return this.select((state) => state.cartProducts?.length);
	}

public	selectSearch(): Observable<string> {
		return this.select((state) => state.searchString);
	}
}
