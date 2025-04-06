import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="home-container">
      <div class="hero">
        <h1>Ultimate Gaming & PC Store</h1>
        <p>Discover High-Performance Gaming PCs, Laptops & Accessories</p>
        <a routerLink="/products" class="cta-button">Shop Gaming Gear</a>
      </div>

      <div class="features">
        <div class="feature">
          <i class="fas fa-microchip"></i>
          <h3>Latest Tech</h3>
          <p>Premium components and cutting-edge hardware</p>
        </div>
        <div class="feature">
          <i class="fas fa-tools"></i>
          <h3>Expert Support</h3>
          <p>Professional tech support and custom builds</p>
        </div>
        <div class="feature">
          <i class="fas fa-shield-alt"></i>
          <h3>Warranty</h3>
          <p>Extended warranty on all products</p>
        </div>
      </div>

      <div class="categories">
        <h2>Shop by Category</h2>
        <div class="category-grid">
          <a routerLink="/products" class="category-card">
            <i class="fas fa-laptop"></i>
            <h3>Gaming Laptops</h3>
          </a>
          <a routerLink="/products" class="category-card">
            <i class="fas fa-desktop"></i>
            <h3>Desktop PCs</h3>
          </a>
          <a routerLink="/products" class="category-card">
            <i class="fas fa-keyboard"></i>
            <h3>Peripherals</h3>
          </a>
          <a routerLink="/products" class="category-card">
            <i class="fas fa-headset"></i>
            <h3>Accessories</h3>
          </a>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .home-container {
      padding: 2rem 0;
    }

    .hero {
      text-align: center;
      padding: 4rem 2rem;
      background: linear-gradient(rgba(79, 70, 229, 0.1), rgba(79, 70, 229, 0.05));
      border-radius: var(--border-radius);
      margin-bottom: 4rem;
    }

    .hero h1 {
      font-size: 2.5rem;
      color: var(--text-color);
      margin-bottom: 1rem;
    }

    .hero p {
      font-size: 1.25rem;
      color: var(--text-light);
      margin-bottom: 2rem;
    }

    .cta-button {
      display: inline-block;
      background: var(--primary-color);
      color: white;
      padding: 1rem 2rem;
      border-radius: var(--border-radius);
      text-decoration: none;
      font-weight: 500;
      transition: background-color 0.2s;
    }

    .cta-button:hover {
      background: var(--primary-hover);
    }

    .features {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 2rem;
      padding: 0 2rem;
      margin-bottom: 4rem;
    }

    .feature {
      text-align: center;
      padding: 2rem;
      background: white;
      border-radius: var(--border-radius);
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    .feature i {
      font-size: 2rem;
      color: var(--primary-color);
      margin-bottom: 1rem;
    }

    .feature h3 {
      font-size: 1.25rem;
      color: var(--text-color);
      margin-bottom: 0.5rem;
    }

    .feature p {
      color: var(--text-light);
    }

    .categories {
      padding: 0 2rem;
    }

    .categories h2 {
      text-align: center;
      font-size: 2rem;
      color: var(--text-color);
      margin-bottom: 2rem;
    }

    .category-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 2rem;
    }

    .category-card {
      text-align: center;
      padding: 2rem;
      background: white;
      border-radius: var(--border-radius);
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      text-decoration: none;
      transition: transform 0.2s;
    }

    .category-card:hover {
      transform: translateY(-5px);
    }

    .category-card i {
      font-size: 2.5rem;
      color: var(--primary-color);
      margin-bottom: 1rem;
    }

    .category-card h3 {
      font-size: 1.25rem;
      color: var(--text-color);
    }

    @media (max-width: 768px) {
      .hero {
        padding: 3rem 1rem;
      }

      .hero h1 {
        font-size: 2rem;
      }

      .features {
        grid-template-columns: 1fr;
        padding: 0 1rem;
      }

      .categories {
        padding: 0 1rem;
      }

      .category-grid {
        grid-template-columns: repeat(2, 1fr);
      }
    }
  `]
})
export class HomeComponent {}
