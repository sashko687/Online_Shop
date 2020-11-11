import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { Observable } from 'rxjs';
import { Product } from '../shared/interfaces';
import { ProductsStore, ProductState } from './product.store';

@Injectable({ providedIn: 'root' })
export class ProductQuery extends QueryEntity<ProductState, Product> {
	constructor(protected store: ProductsStore) {
		super(store);
	}

	selectProducts(): Observable<Product[]> {
		return this.selectAll();
	}

	selectLoaded(): Observable<boolean> {
		return this.select((state) => state.isLoaded);
	}
}
