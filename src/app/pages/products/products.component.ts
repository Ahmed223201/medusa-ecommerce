import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProductService, Product } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  loading = true;
  error = false;
  hoveredProductId: string | null = null;
  isAdmin = false;

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    // Use the simpler admin check as requested
    this.isAdmin = localStorage.getItem('is_admin') === 'true';
    this.loadProducts();
  }

  async loadProducts(): Promise<void> {
    try {
      this.loading = true;
      this.error = false;
      this.products = await this.productService.getProducts();
      this.loading = false;
    } catch (error) {
      console.error('Error loading products:', error);
      this.loading = false;
      this.error = true;
    }
  }

  setHoveredProduct(productId: string | null): void {
    this.hoveredProductId = productId;
  }

  async addToCart(product: Product): Promise<void> {
    try {
      this.cartService.addToCart(product);
      this.notificationService.show('Product added to cart', 'success');
    } catch (error) {
      console.error('Error adding product to cart:', error);
      this.notificationService.show('Failed to add product to cart', 'error');
    }
  }

  truncateDescription(description: string, maxLength: number = 100): string {
    if (description.length <= maxLength) return description;
    return description.substring(0, maxLength) + '...';
  }

  // Placeholder for admin edit/delete actions
  editProduct(product: Product): void {
    // You can route to admin dashboard or open a modal, or copy admin logic here
    alert('Edit product: ' + product.title);
  }

  deleteProduct(productId: string): void {
    if (confirm('Are you sure you want to delete this product?')) {
      // You can call your ProductService or admin logic here
      alert('Product deleted: ' + productId);
    }
  }
}
