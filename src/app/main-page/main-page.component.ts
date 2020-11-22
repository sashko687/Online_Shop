import { ProductQuery } from './../product-store/product.query';
import { Product } from './../shared/interfaces';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ProductService } from '../product-store/product.service';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
	selector: 'app-main-page',
	templateUrl: './main-page.component.html',
	styleUrls: ['./main-page.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainPageComponent implements OnInit {
	public selectedPrice: string;
	public productControl = new FormControl('', Validators.required);
	public products$: Observable<Product[]>;
	public searchProduct$: Observable<string>;

	constructor(public productServ: ProductService, public productQuery: ProductQuery) {}

	ngOnInit(): void {
		this.products$ = this.productQuery.selectProducts();
		this.searchProduct$ = this.productQuery.selectSearch();
		if (!this.productQuery.getHasCache()) {
			this.productServ.getAll().subscribe();
		}
	}
}
