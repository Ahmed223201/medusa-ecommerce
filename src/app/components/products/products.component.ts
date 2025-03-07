import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MedusaService } from '../../services/medusa.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="products-container">
      <div *ngFor="let product of products" class="product-card">
        <h2>{{ product.title }}</h2>
        <p>{{ product.description }}</p>
        <div class="price" *ngIf="product.variants && product.variants[0]">
          {{ product.variants[0].prices[0]?.amount | currency }}
        </div>
        <button (click)="addToCart(product.variants[0].id)">Add to Cart</button>
      </div>
    </div>
  `,
  styles: [`
    .products-container {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
      gap: 20px;
      padding: 20px;
    }
    .product-card {
      border: 1px solid #ddd;
      padding: 15px;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    button {
      background-color: #4CAF50;
      color: white;
      padding: 10px 15px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
    button:hover {
      background-color: #45a049;
    }
  `],
  providers: [MedusaService]
})
export class ProductsComponent implements OnInit {
  products: any[] = [];
  cartId: string = '';

  constructor(private medusaService: MedusaService) {}

  ngOnInit() {
    this.medusaService.createCart().subscribe((cart: any) => {
      this.cartId = cart.cart.id;
    });

    this.medusaService.getProducts().subscribe((response: any) => {
      this.products = response.products;
    });
  }

  addToCart(variantId: string) {
    this.medusaService.addToCart(this.cartId, variantId, 1).subscribe(
      response => console.log('Added to cart', response),
      error => console.error('Error adding to cart', error)
    );
  }
}
