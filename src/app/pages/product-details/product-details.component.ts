import { Component } from '@angular/core';

@Component({
  selector: 'app-product-details',
  imports: [],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
//export class ProductDetailsComponent {

//}
export class ProductDetailsComponent {
  product = {
    id: 1,
    name: 'Example Product',
    description: 'This is a sample product.',
    price: 200,
    image: 'https://via.placeholder.com/150'
  };

  addToCart() {
    console.log('Product added to cart:', this.product);
  }
}
