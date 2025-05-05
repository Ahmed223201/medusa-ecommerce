import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <div class="login-container">
      <div class="login-box">
        <h2>Administrator Login</h2>
        <form (ngSubmit)="onSubmit()" #loginForm="ngForm">
          <div class="form-group">
            <label for="username">Username</label>
            <input 
              type="text" 
              id="username"
              name="username"
              [(ngModel)]="username"
              required
              #usernameInput="ngModel"
              [class.error]="usernameInput.invalid && usernameInput.touched">
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input 
              type="password" 
              id="password"
              name="password"
              [(ngModel)]="password"
              required
              #passwordInput="ngModel"
              [class.error]="passwordInput.invalid && passwordInput.touched">
          </div>
          <button type="submit" [disabled]="loginForm.invalid || isLoading">Login</button>
          <div *ngIf="error" class="error">{{ error }}</div>
        </form>
      </div>
    </div>
  `,
  styles: [`
    .login-container {
      width: 300px;
      margin: auto;
      padding: 20px;
      border: 1px solid #ccc;
      border-radius: 5px;
      box-shadow: 2px 2px 12px rgba(0, 0, 0, 0.2);
    }
    h2 { text-align: center; }
    input { width: 100%; padding: 8px; margin: 5px 0; border: 1px solid #ccc; border-radius: 4px; }
    button { width: 100%; padding: 10px; background-color: #007bff; color: white; border: none; cursor: pointer; }
    button:disabled { background-color: #ccc; }
    .error { color: red; text-align: center; margin-top: 10px; }
  `]
})
export class LoginComponent {
  username = '';
  password = '';
  error = '';
  isLoading = false;

  constructor(private authService: AuthService) {}

  async onSubmit() {
    if (this.username !== 'admin' || this.password !== 'admin') {
      this.error = 'Invalid administrator credentials';
      return;
    }
    this.isLoading = true;
    this.error = '';
    try {
      await this.authService.login('admin', 'admin');
    } catch (err) {
      this.error = 'Login failed';
    } finally {
      this.isLoading = false;
    }
  }
}