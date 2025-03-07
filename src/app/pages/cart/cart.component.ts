import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],  // ✅ Add this
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
//export class CartComponent {
  //cart = []; // Placeholder array for cart items
//}
export class CartComponent {
  cart = [
    { id: 1, name: 'Product 1', price: 100 },
    { id: 2, name: 'Product 2', price: 150 },
  ];

  removeFromCart(item: any) {
    this.cart = this.cart.filter((cartItem) => cartItem.id !== item.id);
  }

  get totalPrice() {
    return this.cart.reduce((sum, item) => sum + item.price, 0);
  }
}