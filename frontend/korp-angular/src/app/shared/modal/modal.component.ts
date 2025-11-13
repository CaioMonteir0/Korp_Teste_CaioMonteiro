import { Component, Input, Output, EventEmitter, OnInit, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalUpdaterComponent } from '../modal-updater/modalUpdater.component';
import { FormsModule } from '@angular/forms';
import { Product } from '../../core/models/product.model';
@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule, FormsModule, ModalUpdaterComponent],
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {


  @Input() title: string = 'Confirmação Necessária'; 
  @Input() message: string = 'Você tem certeza que deseja realizar esta ação?'; 
  @Input() product: Product | undefined;
 
  
  @Input() data: any; 
  
  @Input() bodyTemplate: TemplateRef<any> | null = null;
  
  @Output() confirmed = new EventEmitter<any>();
  
  @Input() showCancelButton: boolean = true;
  @Input() showConfirmButton: boolean = true;


  constructor() { }

  ngOnInit(): void {
  }

  
  confirm(): void {
    
    this.confirmed.emit(this.data || true);
  }

  
  close(): void {
   
    this.confirmed.emit(false);
  }
}