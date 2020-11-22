import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginatorPipe } from './paginator.pipe';

@NgModule({
	declarations: [PaginatorPipe],
	imports: [CommonModule],
	exports: [PaginatorPipe],
})
export class PaginatorPipeModule {}
