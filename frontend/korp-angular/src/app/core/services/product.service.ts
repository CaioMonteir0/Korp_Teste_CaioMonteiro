import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { Product } from '../models/product.model';


@Injectable({ providedIn: 'root' })
export class ProductService {
  private base = `${environment.inventoryApi}/products`;

  constructor(private http: HttpClient) {}

  list(): Observable<Product[]> {
    return this.http.get<Product[]>(this.base);
  }

  create(p: Product): Observable<Product> {
    return this.http.post<Product>(this.base, p);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.base}/${id}`);
  }

  update(id: number, p: Product): Observable<Product> {
    return this.http.put<Product>(`${this.base}/${id}`, p);
  }

  getCode(productId: number): Observable<string>{
  return this.http.get<string>(`${this.base}/${productId}/code`, { responseType: 'text' as 'json' });
}

  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.base}?id=${id}`);
  }

}
