import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ProductService, Product } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  product: Product | null = null;
  loading = true;
  error = false;
  quantity = 1;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const productId = params['id'];
      if (productId) {
        this.fetchProductDetails(productId);
      }
    });
  }

  async fetchProductDetails(productId: string): Promise<void> {
    try {
      this.loading = true;
      this.error = false;
      this.product = await this.productService.getProduct(productId);
      this.loading = false;
    } catch (error) {
      console.error('Error fetching product details:', error);
      this.loading = false;
      this.error = true;
    }
  }

  updateQuantity(value: number): void {
    this.quantity = Math.max(1, this.quantity + value);
  }

  addToCart(): void {
    if (!this.product) {
      this.notificationService.show('Product not available', 'error');
      return;
    }
    for (let i = 0; i < this.quantity; i++) {
      this.cartService.addToCart({ ...this.product });
    }
    this.notificationService.show('Product added to cart', 'success');
  }
}
