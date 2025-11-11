import { Routes } from '@angular/router';
import { ProductsComponent } from './features/products/products.component';
import { InvoicesComponent } from './features/invoices/invoices.component';
import { LoginComponent } from './features/login/login.component';
import { authGuard } from './core/auth/auth.guard';

export const routes: Routes = [
  {path: 'login', component: LoginComponent},
  { path: 'products', component: ProductsComponent, canActivate: [authGuard] },
  { path: 'invoices', component: InvoicesComponent, canActivate: [authGuard] },
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];
