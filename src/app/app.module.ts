import { PaginatorPipeModule } from './paginator-pipe/paginator-pipe.module';
import { SortPriceModule } from './sort-price/sort-price.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainLayoutComponent } from './shared/main-layout/main-layout.component';
import { MainPageComponent } from './main-page/main-page.component';
import { ProductPageComponent } from './product-page/product-page.component';
import { CartPageComponent } from './cart-page/cart-page.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { QuillModule } from 'ngx-quill';
import { AuthInterceptor } from './shared/auth.interceptor';
import { ProductComponent } from './product/product.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatPaginatorModule } from '@angular/material/paginator';
import { NG_ENTITY_SERVICE_CONFIG } from '@datorama/akita-ng-entity-service';
import { AkitaNgDevtools } from '@datorama/akita-ngdevtools';
import { AkitaNgRouterStoreModule } from '@datorama/akita-ng-router-store';
import { SuccesOrderComponent } from './succes-order/succes-order.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { PhohePageComponent } from './phohe-page/phohe-page.component';
import { LaptopPageComponent } from './laptop-page/laptop-page.component';
import { TabletPageComponent } from './tablet-page/tablet-page.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatBadgeModule } from '@angular/material/badge';
import { SearchModule } from './search-pipe/search.module';
import { SortingPipeModule } from './sorting-pipe/sorting-pipe.module';
import { NgxStripeModule } from 'ngx-stripe';

@NgModule({
	declarations: [
		AppComponent,
		MainLayoutComponent,
		MainPageComponent,
		ProductPageComponent,
		CartPageComponent,
		ProductComponent,
		SuccesOrderComponent,
		PhohePageComponent,
		LaptopPageComponent,
		TabletPageComponent,
	],
	imports: [
		PaginatorPipeModule,
		SortPriceModule,
		SortingPipeModule,
		SearchModule,
		MatBadgeModule,
		MatMenuModule,
		MatNativeDateModule,
		MatDatepickerModule,
		MatProgressSpinnerModule,
		MatPaginatorModule,
		MatButtonModule,
		MatIconModule,
		MatSelectModule,
		MatInputModule,
		MatFormFieldModule,
		MatButtonModule,
		MatTableModule,
		BrowserModule,
		AppRoutingModule,
		HttpClientModule,
		FormsModule,
		ReactiveFormsModule,
		QuillModule.forRoot(),
		ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
		BrowserAnimationsModule,
		environment.production ? [] : AkitaNgDevtools.forRoot(),
		NgxStripeModule.forRoot(environment.stripeKey),
		AkitaNgRouterStoreModule.forRoot(),
	],
	providers: [
		{
			provide: HTTP_INTERCEPTORS,
			multi: true,
			useClass: AuthInterceptor,
		},
		{ provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
		{ provide: NG_ENTITY_SERVICE_CONFIG, useValue: { baseUrl: 'https://jsonplaceholder.typicode.com' } },
	],
	bootstrap: [AppComponent],
})
export class AppModule {}
