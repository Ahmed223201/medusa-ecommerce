import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated = false;

  constructor(private router: Router) {
    // Check if user was previously logged in
    this.isAuthenticated = localStorage.getItem('isLoggedIn') === 'true';
  }

  login(username: string, password: string): boolean {
    // For demo purposes, accept any non-empty credentials
    if (username && password) {
      this.isAuthenticated = true;
      localStorage.setItem('isLoggedIn', 'true');
      this.router.navigate(['/admin']);
      return true;
    }
    return false;
  }

  logout(): void {
    this.isAuthenticated = false;
    localStorage.removeItem('isLoggedIn');
    this.router.navigate(['/']);
  }

  isLoggedIn(): boolean {
    return this.isAuthenticated;
  }
}
