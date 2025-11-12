import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {


  @Input() title: string = 'Confirmação Necessária'; 
  @Input() message: string = 'Você tem certeza que deseja realizar esta ação?'; 
  
  
  @Output() confirmed = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {
  }

  
  confirm(): void {
    
    this.confirmed.emit(true);
  }

  
  close(): void {
   
    this.confirmed.emit(false);
  }
}