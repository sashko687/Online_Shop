import { ProductQuery } from './../../product-store/product.query';
import { take, takeUntil } from 'rxjs/operators';
import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { ProductService } from 'src/app/product-store/product.service';
import { Observable, Subject } from 'rxjs';
import { Product } from 'src/app/shared/interfaces';

@Component({
	selector: 'app-dashboard-page',
	templateUrl: './dashboard-page.component.html',
	styleUrls: ['./dashboard-page.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardPageComponent implements OnInit, OnDestroy {
	public products$: Observable<Product[]>;
	private pSub$ = new Subject();
	public productName: string;
	public displayedColumns: string[] = ['id', 'title', 'price', 'date', 'edit', 'delete'];

	constructor(private productServ: ProductService, private productQuery: ProductQuery) {}

	ngOnInit(): void {
		this.products$ = this.productQuery.selectProducts();
		if (!this.productQuery.getHasCache()) {
			this.productServ.getAll().pipe(takeUntil(this.pSub$)).subscribe();
		}
	}

	public remove(id: string): void {
		this.productServ.remove(id).pipe(takeUntil(this.pSub$)).subscribe();
	}

	ngOnDestroy(): void {
		this.pSub$.next();
		this.pSub$.complete();
	}
}
