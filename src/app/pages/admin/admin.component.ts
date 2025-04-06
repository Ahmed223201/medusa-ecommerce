import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService, Product } from '../../services/product.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule],
  template: '<div class="admin-container">' +
    '<div class="admin-header">' +
      '<h2>Admin Dashboard</h2>' +
      '<button class="logout-btn" (click)="logout()">' +
        '<i class="fas fa-sign-out-alt"></i>' +
        'Logout' +
      '</button>' +
    '</div>' +
    '<div class="admin-content">' +
      '<div class="stats-grid">' +
        '<div class="stat-card">' +
          '<h3>Total Products</h3>' +
          '<p class="stat-value">{{ products.length }}</p>' +
        '</div>' +
        '<div class="stat-card">' +
          '<h3>Products on Sale</h3>' +
          '<p class="stat-value">{{ productsOnSale }}</p>' +
        '</div>' +
        '<div class="stat-card">' +
          '<h3>Low Stock Items</h3>' +
          '<p class="stat-value">{{ lowStockProducts }}</p>' +
        '</div>' +
      '</div>' +
      '<div class="product-list">' +
        '<h3>Product Management</h3>' +
        '<div class="table-container">' +
          '<table>' +
            '<thead>' +
              '<tr>' +
                '<th>Product</th>' +
                '<th>Price</th>' +
                '<th>Stock</th>' +
                '<th>Status</th>' +
              '</tr>' +
            '</thead>' +
            '<tbody>' +
              '<tr *ngFor="let product of products">' +
                '<td>' +
                  '<div class="product-cell">' +
                    '<img [src]="product.image" [alt]="product.title">' +
                    '<div>' +
                      '<p class="product-title">{{ product.title }}</p>' +
                      '<p class="product-category">{{ product.category }}</p>' +
                    '</div>' +
                  '</div>' +
                '</td>' +
                '<td>' +
                  '<div class="price-cell">' +
                    '<p class="current-price">${{ product.onSale ? product.salePrice : product.price }}</p>' +
                    '<p class="original-price" *ngIf="product.onSale">${{ product.price }}</p>' +
                  '</div>' +
                '</td>' +
                '<td>' +
                  '<span [class.low-stock]="product.stock <= 5">' +
                    '{{ product.stock }}' +
                  '</span>' +
                '</td>' +
                '<td>' +
                  '<span class="status" [class.on-sale]="product.onSale">' +
                    '{{ product.onSale ? "On Sale" : "Regular Price" }}' +
                  '</span>' +
                '</td>' +
              '</tr>' +
            '</tbody>' +
          '</table>' +
        '</div>' +
      '</div>' +
    '</div>' +
  '</div>',
  styles: [`
    .admin-container {
      padding: 2rem;
    }

    .admin-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 2rem;
    }

    .admin-header h2 {
      margin: 0;
      color: var(--text-color);
    }

    .logout-btn {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.5rem 1rem;
      background: var(--error-color);
      color: white;
      border: none;
      border-radius: var(--border-radius);
      cursor: pointer;
      transition: background-color 0.2s;
    }

    .logout-btn:hover {
      background: #e53e3e;
    }

    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 1.5rem;
      margin-bottom: 2rem;
    }

    .stat-card {
      background: white;
      padding: 1.5rem;
      border-radius: var(--border-radius);
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    .stat-card h3 {
      margin: 0 0 0.5rem;
      color: var(--text-light);
      font-size: 1rem;
    }

    .stat-value {
      margin: 0;
      font-size: 2rem;
      font-weight: 600;
      color: var(--text-color);
    }

    .product-list {
      background: white;
      padding: 1.5rem;
      border-radius: var(--border-radius);
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    .product-list h3 {
      margin: 0 0 1.5rem;
      color: var(--text-color);
    }

    .table-container {
      overflow-x: auto;
    }

    table {
      width: 100%;
      border-collapse: collapse;
    }

    th {
      text-align: left;
      padding: 1rem;
      color: var(--text-light);
      font-weight: 500;
      border-bottom: 2px solid var(--border-color);
    }

    td {
      padding: 1rem;
      border-bottom: 1px solid var(--border-color);
    }

    .product-cell {
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    .product-cell img {
      width: 48px;
      height: 48px;
      object-fit: cover;
      border-radius: var(--border-radius);
    }

    .product-title {
      margin: 0;
      color: var(--text-color);
      font-weight: 500;
    }

    .product-category {
      margin: 0;
      color: var(--text-light);
      font-size: 0.875rem;
    }

    .price-cell {
      display: flex;
      flex-direction: column;
    }

    .current-price {
      margin: 0;
      color: var(--text-color);
      font-weight: 500;
    }

    .original-price {
      margin: 0;
      color: var(--text-light);
      text-decoration: line-through;
      font-size: 0.875rem;
    }

    .low-stock {
      color: var(--error-color);
      font-weight: 500;
    }

    .status {
      display: inline-block;
      padding: 0.25rem 0.5rem;
      border-radius: var(--border-radius);
      font-size: 0.875rem;
      background: var(--background-color);
      color: var(--text-color);
    }

    .status.on-sale {
      background: var(--error-color);
      color: white;
    }

    @media (max-width: 768px) {
      .admin-container {
        padding: 1rem;
      }

      .stats-grid {
        grid-template-columns: 1fr;
      }

      .product-cell {
        flex-direction: column;
        align-items: flex-start;
        gap: 0.5rem;
      }
    }
  `]
})
export class AdminComponent implements OnInit {
  products: Product[] = [];
  productsOnSale = 0;
  lowStockProducts = 0;

  constructor(
    private productService: ProductService,
    private authService: AuthService
  ) {}

  async ngOnInit() {
    this.products = await this.productService.getProducts();
    this.updateStats();
  }

  private updateStats() {
    this.productsOnSale = this.products.filter(p => p.onSale).length;
    this.lowStockProducts = this.products.filter(p => p.stock <= 5).length;
  }

  logout() {
    this.authService.logout();
  }
}
