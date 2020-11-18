import { SearchProductPipe } from './searchProductPipe';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
	declarations: [SearchProductPipe],
	imports: [CommonModule],
	exports: [SearchProductPipe],
})
export class SearchModule {}
