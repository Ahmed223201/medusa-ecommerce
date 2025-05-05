import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { FirebaseService } from './firebase.service';
import { environment } from '../../environments/environment';

export interface MedusaProduct {
  id: string;
  title: string;
  description: string;
  handle: string;
  thumbnail: string;
  variants: Array<{
    id: string;
    title: string;
    prices: Array<{
      amount: number;
      currency_code: string;
    }>;
    inventory_quantity: number;
  }>;
  collection_id: string | null;
  collection: any;
  categories: Array<{
    id: string;
    name: string;
  }>;
}

export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  salePrice?: number;
  onSale?: boolean;
  category: string;
  image: string;
  stock: number;
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = environment.apiUrl;
  private useFirebase = true; // Set to true to use Firebase, false to use Medusa API
  private cachedProducts: Product[] | null = null;

  constructor(
    private http: HttpClient,
    private firebaseService: FirebaseService
  ) {}

  async getProducts(forceRefresh: boolean = false): Promise<Product[]> {
    // Return cached products if available and no force refresh is requested
    if (this.cachedProducts && !forceRefresh) {
      return this.cachedProducts;
    }
    
    if (this.useFirebase) {
      this.cachedProducts = await this.firebaseService.getProducts();
      return this.cachedProducts;
    }
    
    try {
      const response = await firstValueFrom(
        this.http.get<{ products: MedusaProduct[] }>(`${this.apiUrl}/products`)
      );

      this.cachedProducts = response.products.map(p => this.convertMedusaProduct(p));
      return this.cachedProducts;
    } catch (error) {
      console.error('Error fetching products:', error);
      return [];
    }
  }

  async getProduct(id: string): Promise<Product | null> {
    // Try to find in cache first
    if (this.cachedProducts) {
      const cachedProduct = this.cachedProducts.find(p => p.id === id);
      if (cachedProduct) {
        return cachedProduct;
      }
    }
    
    if (this.useFirebase) {
      return this.firebaseService.getProduct(id);
    }
    
    try {
      const response = await firstValueFrom(
        this.http.get<{ product: MedusaProduct }>(`${this.apiUrl}/products/${id}`)
      );

      return this.convertMedusaProduct(response.product);
    } catch (error) {
      console.error(`Error fetching product ${id}:`, error);
      return null;
    }
  }

  async addProduct(product: Omit<Product, 'id'>): Promise<string | null> {
    if (this.useFirebase) {
      const newId = await this.firebaseService.addProduct(product);
      // Invalidate cache to force refresh on next getProducts call
      this.cachedProducts = null;
      return newId;
    }
    return null; // Not implemented for Medusa API in this example
  }

  async updateProduct(id: string, product: Partial<Product>): Promise<boolean> {
    if (this.useFirebase) {
      const success = await this.firebaseService.updateProduct(id, product);
      // Invalidate cache to force refresh on next getProducts call
      this.cachedProducts = null;
      return success;
    }
    return false; // Not implemented for Medusa API in this example
  }

  async deleteProduct(id: string): Promise<boolean> {
    if (this.useFirebase) {
      const success = await this.firebaseService.deleteProduct(id);
      // Invalidate cache to force refresh on next getProducts call
      this.cachedProducts = null;
      return success;
    }
    return false; // Not implemented for Medusa API in this example
  }

  private convertMedusaProduct(medusaProduct: MedusaProduct): Product {
    const defaultVariant = medusaProduct.variants[0];
    const defaultPrice = defaultVariant?.prices[0]?.amount || 0;
    
    return {
      id: medusaProduct.id,
      title: medusaProduct.title,
      description: medusaProduct.description,
      price: defaultPrice / 100, // Medusa stores prices in cents
      category: medusaProduct.categories?.[0]?.name || 'Uncategorized',
      image: medusaProduct.thumbnail || '',
      stock: defaultVariant?.inventory_quantity || 0
    };
  }
}
