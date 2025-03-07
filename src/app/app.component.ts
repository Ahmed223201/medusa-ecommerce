import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink } from '@angular/router';
import { ProductsComponent } from './components/products/products.component';
import { AuthService } from './services/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, ProductsComponent],
  template: `
    <div class="app-container">
      <header>
        <h1>{{ title }}</h1>
        <nav>
          <a routerLink="/" class="nav-link">Home</a>
          <a routerLink="/products" class="nav-link">Products</a>
          @if (!(isAuthenticated$ | async)) {
            <a routerLink="/login" class="nav-link">Login</a>
          } @else {
            <a (click)="logout()" class="nav-link">Logout</a>
          }
        </nav>
      </header>
      <main>
        <router-outlet></router-outlet>
      </main>
    </div>
  `,
  styles: [`
    .app-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 20px;
    }
    header {
      text-align: center;
      margin-bottom: 30px;
    }
    h1 {
      color: #333;
      font-size: 2.5em;
      margin-bottom: 1rem;
    }
    nav {
      display: flex;
      justify-content: center;
      gap: 1rem;
      margin-bottom: 2rem;
    }
    .nav-link {
      color: #333;
      text-decoration: none;
      padding: 0.5rem 1rem;
      border-radius: 4px;
      transition: background-color 0.3s;
      cursor: pointer;
    }
    .nav-link:hover {
      background-color: #f0f0f0;
    }
  `]
})
export class AppComponent {
  title = 'E-Commerce Store';
  isAuthenticated$: Observable<boolean>;

  constructor(private authService: AuthService) {
    this.isAuthenticated$ = this.authService.isAuthenticated$;
    this.authService.checkAuthStatus();
  }

  logout(): void {
    this.authService.logout();
  }
}
