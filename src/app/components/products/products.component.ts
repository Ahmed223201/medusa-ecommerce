import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MedusaService } from '../../services/medusa.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="products-container">
      <ng-container *ngIf="loading; else errorTemplate">
        <div class="loading">Loading products...</div>
      </ng-container>
      <ng-template #errorTemplate>
        <ng-container *ngIf="error; else productsTemplate">
          <div class="error">{{ error }}</div>
        </ng-container>
        <ng-template #productsTemplate>
          <div *ngFor="let product of products; trackBy: trackProductById">
            <div class="product-card">
              <img *ngIf="product.thumbnail" [src]="product.thumbnail" [alt]="product.title" class="product-image">
              <div class="product-info">
                <h2>{{ product.title }}</h2>
                <p class="description">{{ product.description }}</p>
                <div *ngIf="product.variants && product.variants[0]?.prices && product.variants[0]?.prices[0]" class="price">
                  {{ (product.variants[0].prices[0].amount / 100) | currency }}
                </div>
                <button 
                  (click)="addToCart(product.variants[0].id)"
                  [disabled]="!product.variants?.[0]?.id"
                  class="add-to-cart">
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </ng-template>
      </ng-template>
    </div>
  `,
  styles: [`
    .products-container {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 24px;
      padding: 20px;
    }
    .product-card {
      border: 1px solid #e0e0e0;
      padding: 0;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      transition: transform 0.2s, box-shadow 0.2s;
      background: white;
    }
    .product-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 4px 8px rgba(0,0,0,0.15);
    }
    .product-image {
      width: 100%;
      height: 200px;
      object-fit: cover;
      border-bottom: 1px solid #e0e0e0;
    }
    .product-info {
      padding: 16px;
    }
    h2 {
      margin: 0 0 8px 0;
      font-size: 1.2rem;
      color: #333;
    }
    .description {
      color: #666;
      font-size: 0.9rem;
      margin-bottom: 16px;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
    .price {
      font-size: 1.25rem;
      font-weight: bold;
      color: #2e7d32;
      margin-bottom: 16px;
    }
    .add-to-cart {
      width: 100%;
      background-color: #4CAF50;
      color: white;
      padding: 12px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-weight: 500;
      transition: background-color 0.2s;
    }
    .add-to-cart:hover:not(:disabled) {
      background-color: #45a049;
    }
    .add-to-cart:disabled {
      background-color: #cccccc;
      cursor: not-allowed;
    }
    .loading {
      text-align: center;
      padding: 2rem;
      font-size: 1.2rem;
      color: #666;
      grid-column: 1 / -1;
    }
    .error {
      text-align: center;
      padding: 2rem;
      color: #dc3545;
      grid-column: 1 / -1;
    }
  `]
})
export class ProductsComponent implements OnInit {
  products: any[] = [];
  cartId: string = '';
  loading: boolean = true;
  error: string = '';

  constructor(private medusaService: MedusaService) {}

  ngOnInit() {
    this.medusaService.createCart().subscribe({
      next: (cart: any) => {
        this.cartId = cart.cart.id;
      },
      error: (err) => {
        console.error('Error creating cart:', err);
      }
    });

    this.medusaService.getProducts().subscribe({
      next: (response: any) => {
        this.products = response.products;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load products. Please try again later.';
        this.loading = false;
        console.error('Error loading products:', err);
      }
    });
  }

  trackProductById(index: number, product: any) {
    return product.id;
  }

  addToCart(variantId: string) {
    if (!this.cartId || !variantId) return;
    
    this.medusaService.addToCart(this.cartId, variantId, 1).subscribe({
      next: (response) => {
        console.log('Added to cart', response);
        // You could show a success message here
      },
      error: (err) => {
        console.error('Error adding to cart:', err);
        // You could show an error message here
      }
    });
  }
}
