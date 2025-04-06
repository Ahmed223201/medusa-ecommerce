import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService, Product } from '../../services/product.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule],
  template: '<div class="products-container">' +
    '<div class="products-grid">' +
      '<div *ngFor="let product of products" class="product-card">' +
        '<div class="product-image">' +
          '<img [src]="product.image" [alt]="product.title">' +
          '<div class="product-badge" *ngIf="product.onSale">SALE</div>' +
        '</div>' +
        '<div class="product-info">' +
          '<h3>{{ product.title }}</h3>' +
          '<p class="description">{{ product.description }}</p>' +
          '<div class="price-rating">' +
            '<div class="price">' +
              '<span class="current-price" [class.sale]="product.onSale">' +
                '$' + '{{ product.onSale ? product.salePrice : product.price }}' +
              '</span>' +
              '<span class="original-price" *ngIf="product.onSale">' +
                '$' + '{{ product.price }}' +
              '</span>' +
            '</div>' +
            '<div class="rating">' +
              '<i class="fas fa-star"></i>' +
              '{{ product.rating }}' +
            '</div>' +
          '</div>' +
          '<div class="stock-info" [class.low-stock]="product.stock <= 5">' +
            '{{ product.stock === 0 ? "Out of Stock" : product.stock + " in stock" }}' +
          '</div>' +
          '<button ' +
            'class="add-to-cart" ' +
            '(click)="addToCart(product)"' +
            '[disabled]="product.stock === 0">' +
            '<i class="fas fa-shopping-cart"></i>' +
            '{{ product.stock === 0 ? "Out of Stock" : "Add to Cart" }}' +
          '</button>' +
        '</div>' +
      '</div>' +
    '</div>' +
  '</div>',
  styles: [`
    .products-container {
      padding: 1rem;
    }

    .products-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 2rem;
      max-width: 1200px;
      margin: 0 auto;
    }

    .product-card {
      background: white;
      border-radius: var(--border-radius);
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      overflow: hidden;
      transition: transform 0.2s, box-shadow 0.2s;
    }

    .product-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 4px 8px rgba(0,0,0,0.15);
    }

    .product-image {
      position: relative;
      aspect-ratio: 4/3;
      overflow: hidden;
    }

    .product-image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.3s;
    }

    .product-card:hover .product-image img {
      transform: scale(1.05);
    }

    .product-badge {
      position: absolute;
      top: 1rem;
      right: 1rem;
      background: var(--error-color);
      color: white;
      padding: 0.25rem 0.75rem;
      border-radius: var(--border-radius);
      font-weight: 500;
      font-size: 0.875rem;
    }

    .product-info {
      padding: 1.5rem;
    }

    .product-info h3 {
      font-size: 1.25rem;
      color: var(--text-color);
      margin-bottom: 0.5rem;
    }

    .description {
      color: var(--text-light);
      font-size: 0.875rem;
      margin-bottom: 1rem;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    .price-rating {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1rem;
    }

    .price {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .current-price {
      font-size: 1.25rem;
      font-weight: 600;
      color: var(--text-color);
    }

    .current-price.sale {
      color: var(--error-color);
    }

    .original-price {
      font-size: 1rem;
      color: var(--text-light);
      text-decoration: line-through;
    }

    .rating {
      display: flex;
      align-items: center;
      gap: 0.25rem;
      color: var(--text-color);
      font-weight: 500;
    }

    .rating i {
      color: #fbbf24;
    }

    .stock-info {
      font-size: 0.875rem;
      color: var(--text-light);
      margin-bottom: 1rem;
    }

    .stock-info.low-stock {
      color: var(--error-color);
    }

    .add-to-cart {
      width: 100%;
      padding: 0.75rem;
      background: var(--primary-color);
      color: white;
      border: none;
      border-radius: var(--border-radius);
      font-weight: 500;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      cursor: pointer;
      transition: background-color 0.2s;
    }

    .add-to-cart:hover:not(:disabled) {
      background: var(--primary-hover);
    }

    .add-to-cart:disabled {
      background: var(--border-color);
      cursor: not-allowed;
    }

    @media (max-width: 768px) {
      .products-grid {
        grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
        gap: 1rem;
      }

      .product-info {
        padding: 1rem;
      }
    }
  `]
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];

  constructor(
    private productService: ProductService,
    private cartService: CartService
  ) {}

  async ngOnInit() {
    this.products = await this.productService.getProducts();
  }

  addToCart(product: Product) {
    const price = product.onSale && product.salePrice ? product.salePrice : product.price;
    this.cartService.addItem({
      id: product.id,
      title: product.title,
      price: price,
      image: product.image
    });
  }
}
