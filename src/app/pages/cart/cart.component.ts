import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CartService, LocalCartItem } from '../../services/cart.service';
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
  isAdmin = false;
  transactions: any[] = [];
  loadingTransactions = false;

  constructor(private cartService: CartService, private firebaseService: FirebaseService) {}

  ngOnInit(): void {
    this.isAdmin = localStorage.getItem('is_admin') === 'true';
    if (this.isAdmin) {
      this.loadTransactions();
    }
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
          title: item.title,
          quantity: item.quantity
        })),
        total: this.total,
        createdAt: new Date().toISOString()
      };
      const result = await this.firebaseService.savePurchaseHistory(purchaseData);
      if (!result) {
        this.submitError = 'Failed to save purchase. Please check your connection or Firebase rules.';
        return;
      }
      this.submitSuccess = true;
      this.cartService.clearCart();
      this.showValidationForm = false;
      this.fullName = '';
      this.phoneNumber = '';
    } catch (error) {
      this.submitError = 'Failed to save purchase. Please try again.';
      console.error(error);
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

  async loadTransactions() {
    this.loadingTransactions = true;
    try {
      const transactions = await this.firebaseService.getTransactions();
      this.transactions = transactions;
    } catch (error) {
      console.error(error);
    }
    this.loadingTransactions = false;
  }
}