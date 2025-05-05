import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Product } from '../../services/product.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <section class="hero-bg">
      <div class="hero-content">
        <img src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80" alt="Computers" class="hero-image">
        <div class="hero-text">
          <h1>Welcome to Medusa Store</h1>
          <p>Find the best deals on computers and tech products.</p>
          <a routerLink="/products" class="shop-now-btn">Shop Now</a>
        </div>
      </div>
    </section>
  `,
  styles: [`
    :host ::ng-deep body {
      min-height: 100vh;
      background: none !important;
      background-attachment: fixed !important;
    }
    :host {
      display: block;
      min-height: 100vh;
    }
    .hero-bg {
      min-height: 60vh;
      width: 100vw;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 5rem 0 3rem 0;
      background: #f8f9fa;
    }
    .hero-content {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 2.5rem;
    }
    .hero-image {
      width: 340px;
      max-width: 90vw;
      border-radius: 2rem;
      box-shadow: 0 8px 32px rgba(99,102,241,0.13), 0 2px 8px rgba(0,0,0,0.06);
      margin-bottom: 1.2rem;
      object-fit: cover;
    }
    .hero-text {
      background: rgba(255,255,255,0.85);
      border-radius: 1.5rem;
      padding: 3rem 2.5rem;
      box-shadow: 0 6px 32px rgba(99,102,241,0.10);
      text-align: center;
      max-width: 700px;
    }
    .hero-text h1 {
      font-size: 2.7rem;
      font-weight: 900;
      color: #6366f1;
      margin-bottom: 1.2rem;
      letter-spacing: 2px;
    }
    .hero-text p {
      font-size: 1.3rem;
      color: #222;
      margin-bottom: 2rem;
    }
    .shop-now-btn {
      background: #6366f1;
      color: #fff;
      padding: 0.9rem 2.2rem;
      border: none;
      border-radius: 0.7rem;
      font-size: 1.1rem;
      font-weight: 700;
      letter-spacing: 1px;
      box-shadow: 0 2px 8px rgba(99,102,241,0.07);
      transition: background 0.2s, transform 0.2s;
    }
    .shop-now-btn:hover {
      background: #4338ca;
      transform: scale(1.04);
    }
    .home-container {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: calc(100vh - 64px);
      padding: 2rem;
      background-color: #f8f9fa;
    }

    .welcome-box {
      background: white;
      padding: 3rem;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      text-align: center;
      max-width: 600px;
      width: 100%;
    }

    h1 {
      color: #333;
      margin-bottom: 1rem;
      font-size: 2.5rem;
    }

    p {
      color: #666;
      margin-bottom: 2rem;
      font-size: 1.2rem;
    }

    .cta-buttons {
      display: flex;
      gap: 1rem;
      justify-content: center;
    }

    .cta-btn {
      text-decoration: none;
      padding: 0.75rem 1.5rem;
      border-radius: 4px;
      font-weight: 500;
      transition: transform 0.2s;
    }

    .cta-btn:hover {
      transform: translateY(-2px);
    }

    .primary {
      background: #007bff;
      color: white;
    }

    .secondary {
      background: #6c757d;
      color: white;
    }

    @media (max-width: 768px) {
      .home-container {
        padding: 1rem;
      }

      .welcome-box {
        padding: 2rem;
      }

      h1 {
        font-size: 2rem;
      }

      .cta-buttons {
        flex-direction: column;
      }
    }
  `]
})
export class HomeComponent {
  products: Product[] = [];
}
