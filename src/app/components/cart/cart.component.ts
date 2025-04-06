import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: '<div class="cart-modal" *ngIf="cartService.cartItems$ | async as items">' +
    '<div class="cart-header">' +
      '<h2>Shopping Cart</h2>' +
      '<button class="close-btn" (click)="close.emit()">×</button>' +
    '</div>' +
    '<div class="cart-items" *ngIf="items.length > 0; else emptyCart">' +
      '<div class="cart-item" *ngFor="let item of items">' +
        '<div class="item-image" *ngIf="item.image">' +
          '<img [src]="item.image" [alt]="item.title">' +
        '</div>' +
        '<div class="item-details">' +
          '<h3>{{ item.title }}</h3>' +
          '<p class="price">${{ item.price.toFixed(2) }}</p>' +
        '</div>' +
        '<div class="item-quantity">' +
          '<button (click)="updateQuantity(item.id, item.quantity - 1)">-</button>' +
          '<span>{{ item.quantity }}</span>' +
          '<button (click)="updateQuantity(item.id, item.quantity + 1)">+</button>' +
        '</div>' +
        '<button class="remove-btn" (click)="removeItem(item.id)">Remove</button>' +
      '</div>' +
      '<div class="cart-footer">' +
        '<div class="total">' +
          '<span>Total:</span>' +
          '<span class="total-amount">${{ cartService.getTotal().toFixed(2) }}</span>' +
        '</div>' +
        '<button class="checkout-btn" (click)="checkout()">Proceed to Checkout</button>' +
      '</div>' +
    '</div>' +
    '<ng-template #emptyCart>' +
      '<div class="empty-cart">' +
        '<p>Your cart is empty</p>' +
        '<button (click)="close.emit()">Continue Shopping</button>' +
      '</div>' +
    '</ng-template>' +
  '</div>',
  styles: [`
    .cart-modal {
      background: white;
      padding: 2rem;
      border-radius: var(--border-radius);
      max-width: 600px;
      width: 100%;
      max-height: 80vh;
      overflow-y: auto;
    }
    .cart-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 2rem;
      padding-bottom: 1rem;
      border-bottom: 1px solid var(--border-color);
    }
    .close-btn {
      background: none;
      border: none;
      font-size: 1.5rem;
      cursor: pointer;
      color: var(--text-light);
    }
    .close-btn:hover {
      color: var(--text-color);
    }
    .cart-items {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
    .cart-item {
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 1rem;
      border: 1px solid var(--border-color);
      border-radius: var(--border-radius);
    }
    .item-image {
      width: 80px;
      height: 80px;
      flex-shrink: 0;
    }
    .item-image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: var(--border-radius);
    }
    .item-details {
      flex: 1;
    }
    .item-details h3 {
      margin: 0;
      font-size: 1rem;
    }
    .price {
      color: var(--primary-color);
      font-weight: bold;
      margin: 0.5rem 0;
    }
    .item-quantity {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
    .item-quantity button {
      background: var(--background-color);
      border: 1px solid var(--border-color);
      border-radius: var(--border-radius);
      width: 30px;
      height: 30px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
    }
    .item-quantity button:hover {
      background: var(--border-color);
    }
    .remove-btn {
      background: none;
      border: none;
      color: var(--error-color);
      cursor: pointer;
      padding: 0.5rem;
    }
    .remove-btn:hover {
      text-decoration: underline;
    }
    .cart-footer {
      margin-top: 2rem;
      padding-top: 1rem;
      border-top: 1px solid var(--border-color);
    }
    .total {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-weight: bold;
      margin-bottom: 1rem;
    }
    .total-amount {
      color: var(--primary-color);
      font-size: 1.2rem;
    }
    .checkout-btn {
      width: 100%;
      padding: 1rem;
      background: var(--primary-color);
      color: white;
      border: none;
      border-radius: var(--border-radius);
      cursor: pointer;
      font-weight: bold;
    }
    .checkout-btn:hover {
      background: var(--primary-hover);
    }
    .empty-cart {
      text-align: center;
      padding: 2rem;
    }
    .empty-cart p {
      margin-bottom: 1rem;
      color: var(--text-light);
    }
    .empty-cart button {
      padding: 0.75rem 1.5rem;
      background: var(--primary-color);
      color: white;
      border: none;
      border-radius: var(--border-radius);
      cursor: pointer;
    }
    .empty-cart button:hover {
      background: var(--primary-hover);
    }
  `]
})
export class CartComponent {
  @Output() close = new EventEmitter<void>();

  constructor(public cartService: CartService) {}

  updateQuantity(itemId: string, quantity: number) {
    this.cartService.updateQuantity(itemId, quantity);
  }

  removeItem(itemId: string) {
    this.cartService.removeItem(itemId);
  }

  checkout() {
    // Implement checkout logic
    console.log('Proceeding to checkout...');
  }
}
