import { Product } from './../shared/interfaces';
import { EntityStore, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';

export interface ProductState {
	products: Product[];
	cartProducts: Product[];
	searchString: string;
}


@StoreConfig({ name: 'products' })
@Injectable({ providedIn: 'root' })
export class ProductsStore extends EntityStore<ProductState> {
	constructor() {
		super({cartProducts: [] });
	}
}
