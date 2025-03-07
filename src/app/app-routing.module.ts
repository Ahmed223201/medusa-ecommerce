
import { Routes,provideRouter } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ProductsComponent } from './pages/products/products.component';
import { ProductDetailsComponent } from './pages/product-details/product-details.component';
import { CartComponent } from './pages/cart/cart.component';

export const routes: Routes = [
  { path: 'home', component: HomeComponent },  
  { path: 'products', component: ProductsComponent },
  { path: 'products/:id', component: ProductDetailsComponent }, // ✅ Correct dynamic route
  { path: 'cart', component: CartComponent },
  { path: '', component: HomeComponent }, 
];
export const appRouting = provideRouter(routes);