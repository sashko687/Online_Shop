import { Product } from './../shared/interfaces';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductService } from '../shared/product.service';

@Component({
	selector: 'app-main-page',
	templateUrl: './main-page.component.html',
	styleUrls: ['./main-page.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainPageComponent implements OnInit {
	products$: Observable<Product[]>;
	constructor(
		public productServ: ProductService,
		private cdr: ChangeDetectorRef) {}

	ngOnInit(): void {
		this.products$ = this.productServ.getAll();
	}
}
