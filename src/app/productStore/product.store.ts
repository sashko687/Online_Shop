import { Product } from './../shared/interfaces';
import { EntityStore, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';


export interface ProductState {
	orders: Product[];
	isLoaded: boolean
}

export function createInitialState(): ProductState {
	return {
		orders: [],
		isLoaded: false
	};
}

@StoreConfig({ name: 'products' })
@Injectable({ providedIn: 'root' })
export class ProductsStore extends EntityStore<ProductState> {
	constructor() {
		super(createInitialState());
	}
}
