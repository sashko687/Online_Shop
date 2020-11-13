import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { ProductService } from 'src/app/product-store/product.service';
import { Subscription } from 'rxjs';

@Component({
	selector: 'app-dashboard-page',
	templateUrl: './dashboard-page.component.html',
	styleUrls: ['./dashboard-page.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardPageComponent implements OnInit,  OnDestroy {
	products = [];
	pSub: Subscription;
	rSub: Subscription;
	productName;
	displayedColumns: string[] = ['id','title', 'price', 'date', 'edit', 'delete'];

	constructor(
		private productServ: ProductService,
		private cdr: ChangeDetectorRef) {}

	ngOnInit() {
		this.pSub = this.productServ.getAll().subscribe((products) => {
			this.products = products;
			this.cdr.detectChanges();
		});
	}
	remove(id): void {
		this.rSub = this.productServ.remove(id).subscribe(() => {
			this.products = this.products.filter((product) => product.id !== id);
			this.cdr.detectChanges();
		});
	}

	ngOnDestroy() {

			this.pSub?.unsubscribe();

			this.rSub?.unsubscribe();
		}

}
