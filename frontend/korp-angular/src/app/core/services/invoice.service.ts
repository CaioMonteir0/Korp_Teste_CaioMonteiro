import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { Invoice } from '../models/invoice.model';

@Injectable({ providedIn: 'root' })
export class InvoiceService {
  private base = `${environment.billingApi}/invoices`;
  constructor(private http: HttpClient) { }
  list(): Observable<Invoice[]> { return this.http.get<Invoice[]>(this.base); }
  create(inv: Invoice) { return this.http.post<Invoice>(this.base, inv); }
  print(id: number) { return this.http.post(`${this.base}/${id}/print`, {}); }
  retry(id: number) {
    return this.http.post(`${this.base}/${id}/retry`, {});
  }

}
