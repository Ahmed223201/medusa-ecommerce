import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-products',
  standalone: true, // ✅ Standalone component
  imports: [CommonModule], // ✅ Import CommonModule for *ngFor
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {
  products = [
    { name: 'Laptop', price: 2500, image: 'assets/laptop.png' },
    { name: 'Smartphone', price: 1200, image: 'assets/smartphone.png' },
    { name: 'Headphones', price: 300, image: 'assets/headphones.png' }
  ];
}
