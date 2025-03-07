import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="login-container">
      <form (ngSubmit)="onSubmit()" #loginForm="ngForm" class="login-form">
        <h2>Login</h2>
        
        <div class="form-group">
          <label for="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            [(ngModel)]="email"
            required
            class="form-control"
          />
        </div>

        <div class="form-group">
          <label for="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            [(ngModel)]="password"
            required
            class="form-control"
          />
        </div>

        <button type="submit" [disabled]="!loginForm.form.valid">
          Login
        </button>

        @if (error) {
          <div class="error-message">
            {{ error }}
          </div>
        }
      </form>
    </div>
  `,
  styles: [`
    .login-container {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 80vh;
    }
    .login-form {
      background: white;
      padding: 2rem;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      width: 100%;
      max-width: 400px;
    }
    h2 {
      text-align: center;
      margin-bottom: 2rem;
      color: #333;
    }
    .form-group {
      margin-bottom: 1rem;
    }
    label {
      display: block;
      margin-bottom: 0.5rem;
      color: #666;
    }
    .form-control {
      width: 100%;
      padding: 0.5rem;
      border: 1px solid #ddd;
      border-radius: 4px;
      margin-bottom: 1rem;
    }
    button {
      width: 100%;
      padding: 0.75rem;
      background-color: #4CAF50;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
    button:disabled {
      background-color: #cccccc;
      cursor: not-allowed;
    }
    button:hover:not(:disabled) {
      background-color: #45a049;
    }
    .error-message {
      color: #dc3545;
      text-align: center;
      margin-top: 1rem;
    }
  `]
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  error: string = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onSubmit() {
    this.error = '';
    this.authService.login(this.email, this.password).subscribe({
      next: () => {
        this.router.navigate(['/']);
      },
      error: (err) => {
        this.error = 'Invalid email or password';
        console.error('Login error:', err);
      }
    });
  }
}
