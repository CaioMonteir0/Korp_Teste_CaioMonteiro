import { Routes } from '@angular/router';
import { ProductsComponent } from './features/products/products.component';
import { InvoicesComponent } from './features/invoices/invoices.component';

export const routes: Routes = [
  { path: '', redirectTo: 'products', pathMatch: 'full' },
  { path: 'products', component: ProductsComponent },
  { path: 'invoices', component: InvoicesComponent }
];
