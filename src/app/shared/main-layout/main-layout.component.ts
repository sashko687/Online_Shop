import { ProductQuery } from './../../product-store/product.query';
import { ChangeDetectionStrategy,Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/product-store/product.service';
import { Observable } from 'rxjs';

@Component({
	selector: 'app-main-layout',
	templateUrl: './main-layout.component.html',
	styleUrls: ['./main-layout.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainLayoutComponent implements OnInit {
public	type = 'Phone';
public	hidden = false;
public	countPdoductInCart: Observable<number>;
	constructor(public productServ: ProductService, public productQuery: ProductQuery) {}

	ngOnInit(): void {
		this.countPdoductInCart = this.productQuery.selectCartProductsLength();
	}
	public applyFilter(event: Event): void {
		const filterValue = (event.target as HTMLInputElement).value;
		this.productServ.setSearchString(filterValue);
	}

	public toggleBadgeVisibility(): void {
		this.hidden = !this.hidden;
	}
}
