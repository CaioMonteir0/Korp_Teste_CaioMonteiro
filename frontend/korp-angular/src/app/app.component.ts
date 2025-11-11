import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from './core/auth/auth.service';
import { LogoutButtonComponent } from '../app/shared/loggon-button/logout-button.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    LogoutButtonComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'korp-angular';

  constructor(public router: Router, private auth: AuthService) {}

  isLoggedIn(): boolean {
    return this.auth.isAuthenticated();
  }

  isLoginPage(): boolean {
    return this.router.url === '/login';
  }
}
