import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly TOKEN_KEY = 'auth_token';
  private encryptedToken: string = '';

  constructor(private router: Router) {}

  login(username: string, password: string): boolean {
    // Simulação simples de login
    if (username === 'admin' && password === '1234') {
      this.encryptedToken = btoa(`${this.TOKEN_KEY}:${username}:${password}`);
      localStorage.setItem(this.encryptedToken, 'fake-jwt-token');
      return true;
    }
    return false;
  }

  logout() {
    localStorage.removeItem(this.encryptedToken);
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem(this.encryptedToken);
  }
}
