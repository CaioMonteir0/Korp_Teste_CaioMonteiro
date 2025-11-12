import { Component, OnInit } from '@angular/core';
import { ProductService} from '../../core/services/product.service';
import { FormBuilder, Validators, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Product } from '../../core/models/product.model';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  form!: FormGroup;
  errorMessage = '';

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
  const confirmDelete = confirm('Deseja remover este produto?');
  if (!confirmDelete) return;
  if (this.products[index]?.id) {
  this.svc.delete(this.products[index].id).subscribe(() => {
    this.products.splice(index, 1);
  });
} else {
  
  this.showErrorMessage("Produto não pode ser removido");
}
  this.load();
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
}
