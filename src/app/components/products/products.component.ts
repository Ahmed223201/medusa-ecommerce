import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductService, Product } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  searchQuery = '';
  loading = true;
  error = false;

  constructor(
    private productService: ProductService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  async loadProducts(): Promise<void> {
    try {
      this.loading = true;
      this.error = false;
      this.products = await this.productService.getProducts();
      this.filteredProducts = [...this.products];
      this.loading = false;
    } catch (error) {
      console.error('Error loading products:', error);
      this.loading = false;
      this.error = true;
    }
  }

  onSearch() {
    if (!this.searchQuery.trim()) {
      this.filteredProducts = [...this.products];
      return;
    }
    const query = this.searchQuery.toLowerCase().trim();
    this.filteredProducts = this.products.filter(product => 
      product.title.toLowerCase().includes(query) ||
      product.description.toLowerCase().includes(query)
    );
  }

  addToCart(product: Product): void {
    this.cartService.addToCart(product);
    // Optionally show a notification here if you want
  }
}
