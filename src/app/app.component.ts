import { Component } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from './services/auth.service';
import { CartService } from './services/cart.service';
import { NotificationService } from './services/notification.service';
import { NotificationComponent } from './components/notification/notification.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, RouterModule, NotificationComponent],
  template: '<div class="app-container">' +
    '<app-notification></app-notification>' +
    '<nav class="navbar">' +
      '<div class="nav-left">' +
        '<a routerLink="/" class="logo">Medusa Store</a>' +
        '<div class="nav-links">' +
          '<a routerLink="/products" class="nav-link">Products</a>' +
          '<a routerLink="/cart" class="nav-link">Cart</a>' +
        '</div>' +
      '</div>' +
      '<div class="nav-right">' +
        '<ng-container *ngIf="(authService.isAuthenticated$ | async) && (authService.currentUser$ | async)?.isAdmin">' +
          '<a routerLink="/admin" class="nav-link admin-link">Administrator Panel</a>' +
          '<button class="logout-btn" (click)="authService.logout()">Logout</button>' +
        '</ng-container>' +
        '<ng-container *ngIf="!(authService.isAuthenticated$ | async) || !(authService.currentUser$ | async)?.isAdmin">' +
          '<a routerLink="/administrator" class="nav-link">Administrator Login</a>' +
        '</ng-container>' +
      '</div>' +
    '</nav>' +
    '<main>' +
      '<router-outlet></router-outlet>' +
    '</main>' +
  '</div>',
  styles: [`
    .app-container {
      min-height: 100vh;
      background-color: #f8f9fa;
    }

    .navbar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1rem 2rem;
      background: white;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    .nav-left {
      display: flex;
      align-items: center;
      gap: 2rem;
    }

    .nav-links {
      display: flex;
      gap: 1rem;
    }

    .logo {
      color: #333;
      text-decoration: none;
      font-size: 1.25rem;
      font-weight: bold;
      transition: color 0.2s;
    }

    .logo:hover {
      color: #007bff;
    }

    .nav-right {
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    .nav-link {
      color: #666;
      text-decoration: none;
      padding: 0.5rem 1rem;
      border-radius: 4px;
      transition: background-color 0.2s;
    }

    .nav-link:hover {
      background: #f0f0f0;
      color: #333;
    }

    .cart-btn {
      position: relative;
      color: #666;
      text-decoration: none;
      padding: 0.5rem 1rem;
      border-radius: 4px;
    }

    .cart-count {
      position: absolute;
      top: -5px;
      right: -5px;
      background: #dc3545;
      color: white;
      font-size: 0.75rem;
      padding: 0.25rem 0.5rem;
      border-radius: 1rem;
      min-width: 1.5rem;
      text-align: center;
    }

    .user-info {
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    .admin-link {
      background: #28a745;
      color: white !important;
      text-decoration: none;
      padding: 0.5rem 1rem;
      border-radius: 4px;
      transition: background-color 0.2s;
    }

    .admin-link:hover {
      background: #218838;
    }

    .logout-btn {
      background: none;
      border: none;
      color: #dc3545;
      cursor: pointer;
      padding: 0.5rem;
      font-size: 0.875rem;
    }

    .logout-btn:hover {
      text-decoration: underline;
    }

    @media (max-width: 768px) {
      .navbar {
        padding: 1rem;
        flex-direction: column;
        gap: 1rem;
      }

      .nav-left {
        flex-direction: column;
        align-items: center;
        gap: 1rem;
        width: 100%;
      }

      .nav-links {
        width: 100%;
        justify-content: center;
      }

      .nav-right {
        width: 100%;
        justify-content: center;
        flex-wrap: wrap;
      }

      .user-info {
        flex-direction: column;
        align-items: center;
      }
    }
  `]
})
export class AppComponent {
  constructor(
    public authService: AuthService,
    public cartService: CartService,
    public notificationService: NotificationService
  ) {}
}
