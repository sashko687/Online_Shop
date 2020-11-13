import { TabletPageComponent } from './tablet-page/tablet-page.component';
import { LaptopPageComponent } from './laptop-page/laptop-page.component';
import { PhohePageComponent } from './phohe-page/phohe-page.component';
import { SuccesOrderComponent } from './succes-order/succes-order.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainLayoutComponent } from './shared/main-layout/main-layout.component';
import { MainPageComponent } from './main-page/main-page.component';
import { ProductPageComponent } from './product-page/product-page.component';
import { CartPageComponent } from './cart-page/cart-page.component';

const routes: Routes = [
	{
		path: '',
		component: MainLayoutComponent,
		children: [
			{ path: '', redirectTo: '/', pathMatch: 'full' },
			{ path: '', component: MainPageComponent },
			{ path: 'phone', component: PhohePageComponent},
			{ path: 'tablet', component: TabletPageComponent },
			{ path: 'laptop', component: LaptopPageComponent },
			{ path: 'product/:id', component: ProductPageComponent },
			{ path: 'cart', component: CartPageComponent },
			{ path: 'success', component: SuccesOrderComponent },
		],
	},
	{
		path: 'admin',
		loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
	},
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
