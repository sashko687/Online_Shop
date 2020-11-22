import { Product } from './../shared/interfaces';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'paginator',
})
export class PaginatorPipe implements PipeTransform {
	transform(products: Product[], paginatorConfig: number[] = [,]): Product[] {
		if (paginatorConfig[0] && paginatorConfig[1]) {
			return products.slice(
				(paginatorConfig[1] - 1) * paginatorConfig[0],
				paginatorConfig[1] * paginatorConfig[0]
			);
		} else {
			return products;
		}
	}
}
