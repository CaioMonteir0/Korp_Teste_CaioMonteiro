import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/auth/auth.service';

@Component({
  selector: 'app-logout-button',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button class="logout-btn" (click)="logout()">Sair</button>
  `,
  styleUrls: ['./logout-button.component.scss']
})
export class LogoutButtonComponent {
  constructor(private auth: AuthService) {}

  logout() {
    this.auth.logout();
  }
}
