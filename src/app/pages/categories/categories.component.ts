import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="categories-container">
      <div class="categories-header">
        <h1>Product Categories</h1>
      </div>
      <div class="categories-grid">
        <!-- Categories will be loaded here -->
        <div class="category-placeholder">
          <p>Categories coming soon...</p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .categories-container {
      padding: 2rem;
      max-width: 1200px;
      margin: 0 auto;
    }

    .categories-header {
      margin-bottom: 2rem;
    }

    h1 {
      color: #333;
      margin: 0;
    }

    .categories-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
      gap: 2rem;
    }

    .category-placeholder {
      background: white;
      padding: 2rem;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      text-align: center;
      color: #666;
    }

    @media (max-width: 768px) {
      .categories-container {
        padding: 1rem;
      }

      .categories-grid {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class CategoriesComponent {}
