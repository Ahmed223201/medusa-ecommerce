import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MedusaService {
  private apiUrl = environment.medusaApi;

  constructor(private http: HttpClient) {}

  // Get all products
  getProducts() {
    return this.http.get(`${this.apiUrl}/store/products`);
  }

  // Get a single product
  getProduct(id: string) {
    return this.http.get(`${this.apiUrl}/store/products/${id}`);
  }

  // Add to cart
  addToCart(cartId: string, variantId: string, quantity: number) {
    return this.http.post(`${this.apiUrl}/store/carts/${cartId}/line-items`, {
      variant_id: variantId,
      quantity: quantity
    });
  }

  // Create cart
  createCart() {
    return this.http.post(`${this.apiUrl}/store/carts`, {});
  }
}
