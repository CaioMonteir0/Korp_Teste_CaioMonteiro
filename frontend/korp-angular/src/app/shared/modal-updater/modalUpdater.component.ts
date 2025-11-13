import { Component, Input, OnInit, Output, EventEmitter, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { Product } from '../../core/models/product.model';

@Component({
  selector: 'app-modal-updater',
  standalone: true,
  imports: [CommonModule, FormsModule], 
  templateUrl: './modalUpdater.component.html',
  styleUrls: ['./modalUpdater.component.scss']
})
export class ModalUpdaterComponent implements OnInit {

  @Input() product: Product | undefined;
  @Input() title: string = 'Ação Necessária'; 
  @Input() message: string | null = null;
  
  @Input() data: any; 
  
  @Input() bodyTemplate: TemplateRef<any> | null = null;
  
  @Output() confirmed = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
    
    if (!this.product) {
      console.error("ModalUpdaterComponent requer um objeto 'product' para edição.");
    }
  }
}