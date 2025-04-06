import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CartComponent } from './components/cart/cart.component';
import { CartService } from './services/cart.service';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive, FormsModule, CartComponent],
  template: `
    <div class="app-container">
      <header class="header">
        <div class="logo">E-Commerce Store</div>
        <div class="search-bar">
          <input 
            type="text" 
            [(ngModel)]="searchQuery" 
            (keyup.enter)="onSearch()"
            placeholder="Search products..." 
            class="search-input">
          <button class="search-button" (click)="onSearch()">
            <i class="fas fa-search"></i>
          </button>
        </div>
        <div class="nav-links">
          <div class="cart" (click)="toggleCart()">
            <i class="fas fa-shopping-cart"></i>
            <span class="cart-text">Cart ({{ cartService.getItemCount() }})</span>
            <div class="cart-badge" *ngIf="cartService.getItemCount() > 0">
              {{ cartService.getItemCount() }}
            </div>
          </div>
          <ng-container *ngIf="!authService.isLoggedIn(); else loggedIn">
            <a routerLink="/login" class="nav-link">
              <i class="fas fa-user"></i>
              Login
            </a>
          </ng-container>
          <ng-template #loggedIn>
            <a routerLink="/admin" class="nav-link">
              <i class="fas fa-cog"></i>
              Admin
            </a>
            <button class="nav-link" (click)="logout()">
              <i class="fas fa-sign-out-alt"></i>
              Logout
            </button>
          </ng-template>
        </div>
      </header>

      <nav class="navbar">
        <div>
          <a routerLink="/" class="nav-link" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}">Home</a>
          <a routerLink="/products" class="nav-link" routerLinkActive="active">Products</a>
        </div>
      </nav>

      <main>
        <router-outlet></router-outlet>
      </main>

      <footer class="footer">
        <div class="footer-content">
          <p>&copy; 2025 E-Commerce Store. All rights reserved.</p>
        </div>
      </footer>

      <div class="modal-overlay" *ngIf="showCart" (click)="closeCart()">
        <div class="modal-content" (click)="$event.stopPropagation()">
          <app-cart (close)="closeCart()"></app-cart>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .app-container {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
    }

    .header {
      background: white;
      padding: 1rem;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      position: sticky;
      top: 0;
      z-index: 1000;
    }

    .header > div {
      max-width: 1200px;
      margin: 0 auto;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 2rem;
    }

    .logo {
      font-size: 1.5rem;
      font-weight: bold;
      color: var(--primary-color);
      cursor: pointer;
      transition: color 0.2s;
    }

    .logo:hover {
      color: var(--primary-hover);
    }

    .search-bar {
      flex: 1;
      max-width: 600px;
      display: flex;
      position: relative;
    }

    .search-input {
      width: 100%;
      padding: 0.75rem 1rem;
      padding-right: 3rem;
      border: 2px solid var(--border-color);
      border-radius: var(--border-radius);
      font-size: 1rem;
      transition: border-color 0.2s;
    }

    .search-input:focus {
      outline: none;
      border-color: var(--primary-color);
    }

    .search-button {
      position: absolute;
      right: 0;
      top: 0;
      bottom: 0;
      width: 3rem;
      border: none;
      background: none;
      color: var(--text-light);
      cursor: pointer;
      transition: color 0.2s;
    }

    .search-button:hover {
      color: var(--primary-color);
    }

    .nav-links {
      display: flex;
      align-items: center;
      gap: 1.5rem;
    }

    .nav-link {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      color: var(--text-color);
      text-decoration: none;
      font-weight: 500;
      transition: color 0.2s;
      background: none;
      border: none;
      padding: 0;
      cursor: pointer;
      font-size: 1rem;
    }

    .nav-link:hover {
      color: var(--primary-color);
    }

    .nav-link i {
      font-size: 1.2rem;
    }

    .cart {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      cursor: pointer;
      position: relative;
      padding: 0.5rem;
      border-radius: var(--border-radius);
      transition: background-color 0.2s;
    }

    .cart:hover {
      background-color: var(--background-color);
    }

    .cart i {
      font-size: 1.2rem;
      color: var(--primary-color);
    }

    .cart-text {
      color: var(--text-color);
    }

    .cart-badge {
      position: absolute;
      top: -5px;
      right: -5px;
      background: var(--error-color);
      color: white;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.75rem;
      font-weight: bold;
    }

    .navbar {
      background: var(--background-color);
      padding: 1rem;
      border-bottom: 1px solid var(--border-color);
    }

    .navbar > div {
      max-width: 1200px;
      margin: 0 auto;
      display: flex;
      gap: 2rem;
    }

    .navbar .nav-link {
      padding: 0.5rem 0;
      position: relative;
    }

    .navbar .nav-link::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 2px;
      background-color: var(--primary-color);
      transform: scaleX(0);
      transition: transform 0.2s;
    }

    .navbar .nav-link:hover::after,
    .navbar .nav-link.active::after {
      transform: scaleX(1);
    }

    main {
      flex: 1;
      max-width: 1200px;
      margin: 0 auto;
      padding: 2rem;
      width: 100%;
    }

    .footer {
      background: var(--background-color);
      padding: 2rem;
      margin-top: auto;
      border-top: 1px solid var(--border-color);
    }

    .footer-content {
      max-width: 1200px;
      margin: 0 auto;
      text-align: center;
      color: var(--text-light);
    }

    .modal-overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.5);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1100;
      padding: 1rem;
    }

    .modal-content {
      width: 100%;
      max-width: 600px;
      animation: slideIn 0.3s ease-out;
    }

    @keyframes slideIn {
      from {
        transform: translateY(-20px);
        opacity: 0;
      }
      to {
        transform: translateY(0);
        opacity: 1;
      }
    }

    @media (max-width: 768px) {
      .header > div {
        flex-direction: column;
        gap: 1rem;
      }

      .search-bar {
        width: 100%;
      }

      .nav-links {
        width: 100%;
        justify-content: space-between;
      }
    }
  `]
})
export class AppComponent {
  searchQuery: string = '';
  showCart = false;

  constructor(
    public cartService: CartService,
    public authService: AuthService
  ) {}

  onSearch() {
    if (this.searchQuery.trim()) {
      // Implement search functionality
      console.log('Searching for:', this.searchQuery);
    }
  }

  toggleCart() {
    this.showCart = !this.showCart;
  }

  closeCart() {
    this.showCart = false;
  }

  logout() {
    this.authService.logout();
  }
}
