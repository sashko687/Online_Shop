import { Pipe, PipeTransform } from '@angular/core';
import { Product } from './interfaces';

@Pipe({
	name: 'searchProduct',
})
export class SearchProductPipe implements PipeTransform {
	transform(products: Product[], productName = ''): any {
		if (!productName.trim()) {
			return products;
		}

		return products.filter((product) => {
			return product.title.toLowerCase().includes(productName.toLowerCase());
		});
	}
}
