import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy, ViewChild } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { OrderService } from 'src/app/shared/order.service';
import { ProductService } from 'src/app/shared/product.service';
import { takeUntil } from 'rxjs/operators';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
	selector: 'app-orders-page',
	templateUrl: './orders-page.component.html',
	styleUrls: ['./orders-page.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrdersPageComponent implements OnInit, OnDestroy {
	displayedColumns: string[] = ['date', 'phone', 'name', 'address', 'orders', 'price', 'status'];
	orders = [];
	private pSub$ = new Subject();
	private rSub$ = new Subject();

	@ViewChild(MatPaginator) paginator: MatPaginator;

	constructor(private orderServ: OrderService, private cdr: ChangeDetectorRef) {}

	ngOnInit() {
		this.orderServ
			.getAll()
			.pipe(takeUntil(this.pSub$))
			.subscribe((orders) => {
				this.orders = orders;
				this.cdr.detectChanges();
			});
	}

	ngOnDestroy() {
		this.pSub$.next();
		this.pSub$.complete();

		this.rSub$.next();
		this.rSub$.complete();
	}

	remove(id) {
		this.orderServ
			.remove(id)
			.pipe(takeUntil(this.rSub$))
			.subscribe(() => {
				this.orders = this.orders.filter((orders) => orders.id !== id);
				this.cdr.detectChanges();
			});
	}
}
