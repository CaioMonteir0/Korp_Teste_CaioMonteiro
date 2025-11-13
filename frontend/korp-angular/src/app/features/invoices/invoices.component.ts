import { Component, OnInit } from '@angular/core';
import { InvoiceService } from '../../core/services/invoice.service';
import { ProductService } from '../../core/services/product.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Invoice } from '../../core/models/invoice.model';
import { InvoiceItem } from '../../core/models/invoice-item.model';
import { Product } from '../../core/models/product.model';
import { ModalComponent } from '../../shared/modal/modal.component';

@Component({
  selector: 'app-invoices',
  standalone: true,
  imports: [CommonModule, FormsModule, ModalComponent],
  templateUrl: './invoices.component.html',
  styleUrls: ['./invoices.component.scss']
})
export class InvoicesComponent implements OnInit {
  errorMessage: any;
  successMessage: any;
  products: Product[] = [];
  invoices: Invoice[] = [];
  items: InvoiceItem[] = [];
  selectedProductId?: number;
  selectedQty = 1;
  printingId: number | null = null;
  retryingId: number | null = null;
  isDeleteModalVisible: boolean = false;
  itemIndexToRemove: number | null = null;
  
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
    this.itemIndexToRemove = index;
    
    this.isDeleteModalVisible = true;
    
  }

  handleDeleteConfirmation(confirmed: boolean) {
    
    this.isDeleteModalVisible = false;

    
    if (confirmed && this.itemIndexToRemove !== null) {
      
      this.items.splice(this.itemIndexToRemove, 1);
      this.showSuccessMessage('Item removido da nota.');
    } 
    
    // 4. Limpa o índice armazenado
    this.itemIndexToRemove = null;
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
    this.retryingId = inv.id!;
    this.iSvc.retry(inv.id!).subscribe({
      next: () => {
        this.retryingId = null;
        this.showSuccessMessage('Nota reprocessada com sucesso!');
        this.loadInvoices();
      },
      error: err => {
        this.retryingId = null;
        this.showErrorMessage('Erro ao reprocessar: ' + (err.error?.message ?? "serviço indisponível ou produto fora de estoque"));
        this.loadInvoices();
      }
    });
  }


  printInvoice(inv: Invoice) {
    if (inv.status !== 'Aberta') return;
    this.printingId = inv.id!;
    this.errorMessage = "";

    this.iSvc.print(inv.id!).subscribe({
      
      next: () => {

        setTimeout(() => {
          this.printingId = null;
          this.loadInvoices();
          this.loadProducts();
        }, 2000);

        this.showSuccessMessage('Nota fiscal impressa com sucesso!');
    },
      error: (err) => {
        this.printingId = null;
        this.errorMessage = err.error?.message ?? 'Erro inesperado ao imprimir nota fiscal.';
        setTimeout(() => this.errorMessage = '', 4000);
        this.loadInvoices(); // recarrega as notas
      }
    });
  }

  showErrorMessage(message: string) {
    this.errorMessage = message;
    setTimeout(() => this.errorMessage = '', 4000);
  }

  showSuccessMessage(message: string) {
    this.successMessage = message;
    setTimeout(() => this.successMessage = '', 4000);
  }

}