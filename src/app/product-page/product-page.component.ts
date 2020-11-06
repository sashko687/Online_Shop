import { ProductService } from 'src/app/shared/product.service';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';

@Component({
	selector: 'app-product-page',
	templateUrl: './product-page.component.html',
	styleUrls: ['./product-page.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductPageComponent implements OnInit {
	product$;

	constructor(private productServ: ProductService, private route: ActivatedRoute) {}

	ngOnInit(): void {
		this.product$ = this.route.params.pipe(switchMap((params) => this.productServ.getById(params.id)));
	}

	addProduct(product) {
		this.productServ.addProduct(product);
	}
}
