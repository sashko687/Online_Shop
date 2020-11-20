import { SortingPipe } from './../sorting-pipe/sorting.pipe';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SortPricePipe } from './sort-price.pipe';

@NgModule({
	declarations: [SortPricePipe],
	imports: [CommonModule],
	exports: [SortPricePipe],
})
export class SortPriceModule {}
