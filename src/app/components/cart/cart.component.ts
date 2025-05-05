import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService, LocalCartItem } from '../../services/cart.service';
import { RouterModule } from '@angular/router';
import { FirebaseService } from '../../services/firebase.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cart: LocalCartItem[] = [];
  total = 0;
  showValidationForm = false;
  fullName = '';
  phoneNumber = '';
  isSubmitting = false;
  submitError = '';
  submitSuccess = false;

  constructor(private cartService: CartService, private firebaseService: FirebaseService) {}

  ngOnInit(): void {
    this.cartService.cart$.subscribe(cart => {
      this.cart = cart;
      this.total = this.cartService.getTotal();
    });
  }

  removeFromCart(item: LocalCartItem): void {
    this.cartService.removeFromCart(item.id);
  }

  updateQuantity(item: LocalCartItem, quantity: number): void {
    this.cartService.updateQuantity(item.id, quantity);
  }

  clearCart(): void {
    this.cartService.clearCart();
  }

  onQuantityChange(event: Event, item: LocalCartItem): void {
    const input = event.target as HTMLInputElement;
    const value = Number(input.value);
    if (!isNaN(value) && value > 0) {
      this.updateQuantity(item, value);
    }
  }

  validatePurchase() {
    this.showValidationForm = true;
    this.submitError = '';
    this.submitSuccess = false;
  }

  async confirmPurchase() {
    if (!this.fullName.trim() || !this.phoneNumber.trim()) {
      this.submitError = 'Please fill in both fields.';
      return;
    }
    this.isSubmitting = true;
    this.submitError = '';
    try {
      const purchaseData = {
        fullName: this.fullName,
        phoneNumber: this.phoneNumber,
        items: this.cart.map(item => ({
          id: item.id,
          title: item.title,
          quantity: item.quantity,
          price: item.price,
          image: item.image || null
        })),
        total: this.total,
        createdAt: new Date().toISOString()
      };
      await this.firebaseService.savePurchaseHistory(purchaseData);
      this.submitSuccess = true;
      this.cartService.clearCart();
      this.showValidationForm = false;
      this.fullName = '';
      this.phoneNumber = '';
    } catch (error) {
      this.submitError = 'Failed to save purchase. Please try again.';
    } finally {
      this.isSubmitting = false;
    }
  }

  cancelValidation() {
    this.showValidationForm = false;
    this.fullName = '';
    this.phoneNumber = '';
    this.submitError = '';
  }
}
