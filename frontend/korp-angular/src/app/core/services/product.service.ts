import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';

export interface Product { id?: number; code: string; description: string; balance: number; }

@Injectable({ providedIn: 'root' })
export class ProductService {
    private base = `${environment.inventoryApi}/products`;
    constructor(private http: HttpClient) { }
    list(): Observable<Product[]> { return this.http.get<Product[]>(this.base); }
    create(p: Product) { return this.http.post<Product>(this.base, p); }
}
