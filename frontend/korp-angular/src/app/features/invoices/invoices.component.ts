import { Component, OnInit } from '@angular/core';
import { InvoiceService } from '../../core/services/invoice.service';
import { ProductService } from '../../core/services/product.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Invoice } from '../../core/models/invoice.model';
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
  errorMessage: any;
  products: Product[] = [];
  invoices: Invoice[] = [];
  items: InvoiceItem[] = [];
  selectedProductId?: number;
  selectedQty = 1;
  printingId: number | null = null;
  
  constructor(private pSvc: ProductService, private iSvc: InvoiceService) { }

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
    const balanceProductById = this.products.find(p => p.id === (this.selectedProductId != undefined ? +this.selectedProductId : 0))?.balance ?? 0;
    if (this.selectedQty > balanceProductById) {
      this.showErrorMessage('Quantidade solicitada maior que o saldo disponível do produto.');
      return;
    }
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

  retryInvoice(inv: Invoice) {
  this.iSvc.retry(inv.id!).subscribe({
    next: () => {
      alert('Nota reprocessada com sucesso!');
      this.loadInvoices();
    },
    error: err => alert('Erro ao reprocessar: ' + (err.error?.message ?? err.statusText))
  });
}


  printInvoice(inv: Invoice) {
    if (inv.status !== 'Aberta') return;
    this.printingId = inv.id!;
    this.errorMessage = "";

    this.iSvc.print(inv.id!).subscribe({
      //loading spinner delay
      next: () => {

        setTimeout(() => {
          this.printingId = null;
          this.loadInvoices();
          this.loadProducts();
        }, 2000);
    },
      error: (err) => {
        this.printingId = null;
        this.errorMessage = err.error?.message ?? 'Erro inesperado ao imprimir nota fiscal.';
        setTimeout(() => this.errorMessage = '', 4000);
      }
    });
  }

  showErrorMessage(message: string) {
    this.errorMessage = message;
    setTimeout(() => this.errorMessage = '', 4000);
  }

}