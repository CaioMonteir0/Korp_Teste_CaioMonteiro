import { Component, OnInit } from '@angular/core';
import { ProductService} from '../../core/services/product.service';
import { FormBuilder, Validators, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Product } from '../../core/models/product.model';
import { ModalComponent } from '../../shared/modal/modal.component';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ModalComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  form!: FormGroup;
  errorMessage = '';
  successMessage = '';
  isDeleteModalVisible: boolean = false;
  itemIndexToRemove: number | null = null;

  constructor(private fb: FormBuilder, private svc: ProductService) {}


  onSelectCode() {
    const code = this.form.value.code;
    const product = this.products.find(p => p.code === code);
    if (product) {
      this.form.patchValue({
        description: product.description
    
      });
    }
  }

  onSelectDescription() {
    const desc = this.form.value.description;
    const product = this.products.find(p => p.description === desc);
    if (product) {
      this.form.patchValue({
        code: product.code
        
      });
    }
  }

  removeProduct(index: number) {
    this.itemIndexToRemove = index;
    this.isDeleteModalVisible = true;
  }

handleDeleteConfirmation(confirmed: boolean) {
    
    this.isDeleteModalVisible = false;
    
  
    if (confirmed && this.itemIndexToRemove !== null) {
        
        const index = this.itemIndexToRemove;

        if (this.products[index]?.id) {
            
            
            this.svc.delete(this.products[index].id).subscribe({
                next: () => {
                   
                    this.products.splice(index, 1);
                    this.showSuccessMessage("Produto removido com sucesso!");
                    this.load(); 
                },
                error: (err) => {
                    this.showErrorMessage("Erro ao remover produto: " + (err.error?.message ?? err.statusText));
                    this.load(); 
                }
            });
        } else {
            this.showErrorMessage("Produto não pode ser removido (ID não encontrado).");
        }
    }
    
  
    this.itemIndexToRemove = null;
    
}

  ngOnInit() {
    this.form = this.fb.group({
    code: ['', Validators.required],
    description: ['', Validators.required],
    balance: [0, Validators.required]
  });

    this.load();

  }

  load() {
    this.svc.list().subscribe(res => (this.products = res));
  }

  save() {
    const val = this.form.value as Product;
    this.svc.create(val).subscribe(() => {
      this.load();
      this.form.reset({ balance: 0 });
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
