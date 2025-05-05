import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from './product.service';

export interface LocalCartItem {
  id: string;
  title: string;
  price: number;
  quantity: number;
  image?: string;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartKey = 'localCart';
  private cartSubject = new BehaviorSubject<LocalCartItem[]>(this.loadCart());
  cart$ = this.cartSubject.asObservable();

  constructor() {}

  private loadCart(): LocalCartItem[] {
    const data = localStorage.getItem(this.cartKey);
    return data ? JSON.parse(data) : [];
  }

  private saveCart(cart: LocalCartItem[]) {
    localStorage.setItem(this.cartKey, JSON.stringify(cart));
    this.cartSubject.next(cart);
  }

  addToCart(product: Product) {
    const cart = this.loadCart();
    const index = cart.findIndex(item => item.id === product.id);
    if (index > -1) {
      cart[index].quantity += 1;
    } else {
      cart.push({
        id: product.id,
        title: product.title,
        price: product.price,
        quantity: 1,
        image: product.image
      });
    }
    this.saveCart(cart);
  }

  removeFromCart(productId: string) {
    let cart = this.loadCart();
    cart = cart.filter(item => item.id !== productId);
    this.saveCart(cart);
  }

  clearCart() {
    this.saveCart([]);
  }

  updateQuantity(productId: string, quantity: number) {
    const cart = this.loadCart();
    const index = cart.findIndex(item => item.id === productId);
    if (index > -1) {
      cart[index].quantity = quantity;
      if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
      }
      this.saveCart(cart);
    }
  }

  getTotal(): number {
    const cart = this.loadCart();
    return cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  }
}
