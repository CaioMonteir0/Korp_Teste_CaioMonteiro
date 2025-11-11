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

  constructor(private fb: FormBuilder, private svc: ProductService) {}

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
}
