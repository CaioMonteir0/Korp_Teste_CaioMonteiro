import { InvoiceItem } from './invoice-item.model';

export interface Invoice {
  id?: number;
  sequentialNumber?: number;
  status?: string;
  items: InvoiceItem[];
}
