import { Component, OnInit } from '@angular/core';
import { InvoiceService} from '../../core/services/invoice.service';
import { ProductService} from '../../core/services/product.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Invoice} from '../../core/models/invoice.model';
import { InvoiceItem } from '../../core/models/invoice-item.model';
import { Product } from '../../core/models/product.model';

@Component({
  selector: 'app-invoices',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './invoices.component.html',
  styleUrls: ['./invoices.component.scss']
})
export class InvoicesComponent implements OnInit {
  products: Product[] = [];
  invoices: Invoice[] = [];
  items: InvoiceItem[] = [];
  selectedProductId?: number;
  selectedQty = 1;
  printingId: number | null = null;

  constructor(private pSvc: ProductService, private iSvc: InvoiceService) {}

  ngOnInit() {
    this.loadProducts();
    this.loadInvoices();
  }

  loadProducts() {
    this.pSvc.list().subscribe(r => (this.products = r));
  }

  loadInvoices() {
    this.iSvc.list().subscribe(r => (this.invoices = r));
  }

  addItem() {
    if (!this.selectedProductId) return;
    this.items.push({ productId: +this.selectedProductId, quantity: this.selectedQty });
  }

  removeItem(index: number) {
  const confirmDelete = confirm('Deseja remover este item da nota?');
  if (!confirmDelete) return;
  this.items.splice(index, 1);
  }

  getProductCode(productId: number): string {
  const product = this.products.find(p => p.id === productId);
  return product ? product.code : `#${productId}`;
}

getProductDescription(productId: number): string {
  const product = this.products.find(p => p.id === productId);
  return product ? product.description : '';
}


  createInvoice() {
    const inv: Invoice = { items: this.items };
    this.iSvc.create(inv).subscribe(() => {
      this.items = [];
      this.loadInvoices();
    });
  }

  printInvoice(inv: Invoice) {
    if (inv.status !== 'Aberta') return;
    this.printingId = inv.id!;
    this.iSvc.print(inv.id!).subscribe({
      next: () => {
        this.printingId = null;
        this.loadInvoices();
        this.loadProducts();
      },
      error: err => {
        this.printingId = null;
        alert('Erro ao imprimir: ' + (err.error?.message ?? err.statusText));
      }
    });
  }
}