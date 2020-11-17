import { takeUntil } from 'rxjs/operators';
import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { ProductService } from 'src/app/product-store/product.service';
import { Subject } from 'rxjs';
import { Product } from 'src/app/shared/interfaces';

@Component({
	selector: 'app-dashboard-page',
	templateUrl: './dashboard-page.component.html',
	styleUrls: ['./dashboard-page.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardPageComponent implements OnInit, OnDestroy {
	public products: Product[] = [];
	private pSub = new Subject();
	public productName: string;
	public displayedColumns: string[] = ['id', 'title', 'price', 'date', 'edit', 'delete'];

	constructor(private productServ: ProductService, private cdr: ChangeDetectorRef) {}

	ngOnInit() {
		this.productServ
			.getAll()
			.pipe(takeUntil(this.pSub))
			.subscribe((products) => {
				this.products = products;
				this.cdr.detectChanges();
			});
	}

	public remove(id: string): void {
		this.productServ
			.remove(id)
			.pipe(takeUntil(this.pSub))
			.subscribe(() => {
				this.products = this.products.filter((product) => product.id !== id);
				this.cdr.detectChanges();
			});
	}

	ngOnDestroy() {
		this.pSub.next();
		this.pSub.complete();
	}
}
