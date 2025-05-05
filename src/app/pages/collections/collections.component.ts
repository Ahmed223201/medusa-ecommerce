import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-collections',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="collections-container">
      <div class="collections-header">
        <h1>Product Collections</h1>
      </div>
      <div class="collections-grid">
        <!-- Collections will be loaded here -->
        <div class="collection-placeholder">
          <p>Collections coming soon...</p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .collections-container {
      padding: 2rem;
      max-width: 1200px;
      margin: 0 auto;
    }

    .collections-header {
      margin-bottom: 2rem;
    }

    h1 {
      color: #333;
      margin: 0;
    }

    .collections-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
      gap: 2rem;
    }

    .collection-placeholder {
      background: white;
      padding: 2rem;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      text-align: center;
      color: #666;
    }

    @media (max-width: 768px) {
      .collections-container {
        padding: 1rem;
      }

      .collections-grid {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class CollectionsComponent {}
