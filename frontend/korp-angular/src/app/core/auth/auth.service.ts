import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly TOKEN_KEY = 'auth_token';

  constructor(private router: Router) {}

  login(username: string, password: string): boolean {
    // Simulação simples de login
    if (username === 'admin' && password === '1234') {
      localStorage.setItem(this.TOKEN_KEY, 'fake-jwt-token');
      return true;
    }
    return false;
  }

  logout() {
    localStorage.removeItem(this.TOKEN_KEY);
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem(this.TOKEN_KEY);
  }
}
