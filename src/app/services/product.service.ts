import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  products = [
    { id: 1, name: 'Laptop', price: 1200, image: 'assets/laptop.jpg' },
    { id: 2, name: 'Smartphone', price: 800, image: 'assets/phone.jpg' },
  ];

  getAllProducts() {
    return this.products;
  }

  getProductById(id: number) {
    return this.products.find(p => p.id === id);
  }
}
