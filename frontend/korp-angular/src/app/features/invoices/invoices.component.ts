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
  template: `
    <h2>Notas Fiscais</h2>

    <div>
      <label>Produto</label>
      <select [(ngModel)]="selectedProductId">
        <option *ngFor="let p of products" [value]="p.id">
          {{p.description}} ({{p.balance}})
        </option>
      </select>
      <input type="number" [(ngModel)]="selectedQty" min="1">
      <button (click)="addItem()">Adicionar</button>
    </div>

    <ul>
      <li *ngFor="let it of items">{{it.productId}} x {{it.quantity}}</li>
    </ul>

    <button (click)="createInvoice()">Criar Nota</button>

    <h3>Notas</h3>
    <ul>
      <li *ngFor="let inv of invoices">
        #{{inv.sequentialNumber}} - {{inv.status}}
        <button (click)="printInvoice(inv)" [disabled]="inv.status!=='Aberta'">Imprimir</button>
        <span *ngIf="printingId===inv.id">⏳ Imprimindo...</span>
      </li>
    </ul>
  `
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