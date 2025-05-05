import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ProductService, Product } from '../../services/product.service';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  products: Product[] = [];
  loading = true;
  editMode = false;
  currentProduct: Partial<Product> = this.getEmptyProduct();

  constructor(
    private authService: AuthService,
    private productService: ProductService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  async loadProducts(): Promise<void> {
    this.loading = true;
    try {
      // Force refresh from the service
      this.products = await this.productService.getProducts(true);
      console.log('Loaded products:', this.products);
    } catch (error) {
      this.notificationService.show('Failed to load products', 'error');
      console.error('Error loading products:', error);
    } finally {
      this.loading = false;
    }
  }

  editProduct(product: Product): void {
    this.editMode = true;
    this.currentProduct = { ...product };
  }

  cancelEdit(): void {
    this.editMode = false;
    this.currentProduct = this.getEmptyProduct();
  }

  async saveProduct(): Promise<void> {
    try {
      if (!this.currentProduct.title || !this.currentProduct.image) {
        this.notificationService.show('Please fill in all required fields', 'error');
        return;
      }

      if (this.editMode && this.currentProduct.id) {
        // Update existing product
        const success = await this.productService.updateProduct(
          this.currentProduct.id,
          this.currentProduct
        );
        
        if (success) {
          this.notificationService.show('Product updated successfully', 'success');
          await this.loadProducts();
        } else {
          this.notificationService.show('Failed to update product', 'error');
        }
      } else {
        // Add new product
        const id = await this.productService.addProduct(this.currentProduct as Omit<Product, 'id'>);
        
        if (id) {
          this.notificationService.show('Product added successfully', 'success');
          await this.loadProducts();
        } else {
          this.notificationService.show('Failed to add product', 'error');
        }
      }
      
      this.editMode = false;
      this.currentProduct = this.getEmptyProduct();
    } catch (error) {
      this.notificationService.show('An error occurred', 'error');
      console.error('Error saving product:', error);
    }
  }

  async deleteProduct(id: string): Promise<void> {
    if (confirm('Are you sure you want to delete this product?')) {
      try {
        const success = await this.productService.deleteProduct(id);
        
        if (success) {
          this.notificationService.show('Product deleted successfully', 'success');
          await this.loadProducts();
        } else {
          this.notificationService.show('Failed to delete product', 'error');
        }
      } catch (error) {
        this.notificationService.show('An error occurred', 'error');
        console.error('Error deleting product:', error);
      }
    }
  }

  getEmptyProduct(): Partial<Product> {
    return {
      title: '',
      description: '',
      price: 0,
      category: '',
      image: '',
      stock: 0
    };
  }

  logout(): void {
    this.authService.logout();
  }
}
