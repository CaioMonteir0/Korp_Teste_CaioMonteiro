import { Component, Input, Output, EventEmitter, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Invoice } from '../../core/models/invoice.model';
@Component({
  selector: 'app-modal-invoice-reader',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal-invoice-reader.component.html',
  styleUrls: ['./modal-invoice-reader.component.scss']
})
export class ModalInvoiceReaderComponent {
  @Input() invoice!: Invoice;
  @Input() visible = false;
  @Output() close = new EventEmitter<void>();
  @Input() bodyTemplate: TemplateRef<any> | null = null;
  @Output() confirmed = new EventEmitter<void>();

  closeModal() {
    this.close.emit();
  }
}
