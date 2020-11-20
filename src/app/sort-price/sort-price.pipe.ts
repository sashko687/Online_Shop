import { Product } from './../search-pipe/product.interface';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'sortPrice',
})
export class SortPricePipe implements PipeTransform {
	transform(products: Product[], sortPriceValue: string): unknown {
		if (sortPriceValue === 'lowPrice') {
			 return products.sort((a: Product, b: Product) => +a.price - +b.price);
		} else if (sortPriceValue === 'highPrice') {
			return products.sort((a: Product, b: Product) => +b.price -  +a.price );
		} else {
			return products;
		}
	}
}
