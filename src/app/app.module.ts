import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {MatIconModule} from '@angular/material/icon';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
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
import { SortingPipe } from './shared/sorting.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatPaginatorModule } from '@angular/material/paginator';
import { NG_ENTITY_SERVICE_CONFIG } from '@datorama/akita-ng-entity-service';
import { AkitaNgDevtools } from '@datorama/akita-ngdevtools';
import { AkitaNgRouterStoreModule } from '@datorama/akita-ng-router-store';
import { SuccesOrderComponent } from './succes-order/succes-order.component';

@NgModule({
	declarations: [
		AppComponent,
		MainLayoutComponent,
		MainPageComponent,
		ProductPageComponent,
		CartPageComponent,
		ProductComponent,
		SortingPipe,
		SuccesOrderComponent,
	],
	imports: [
		
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
		AkitaNgRouterStoreModule.forRoot()
	],
	providers: [
		{
			provide: HTTP_INTERCEPTORS,
			multi: true,
			useClass: AuthInterceptor,
		},
		{ provide: NG_ENTITY_SERVICE_CONFIG, useValue: { baseUrl: 'https://jsonplaceholder.typicode.com' }},
	],
	bootstrap: [AppComponent],
})
export class AppModule {}
