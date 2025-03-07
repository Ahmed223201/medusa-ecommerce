import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true, // ✅ Standalone Component
  imports: [CommonModule, RouterModule], // ✅ Import CommonModule & RouterModule
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  products = [
    { id: 1, name: 'Laptop', image: 'assets/laptop.jpg', price: 2500 },
    { id: 2, name: 'Smartphone', image: 'assets/smartphone.jpg', price: 1500 },
    { id: 3, name: 'Gaming Headset', image: 'assets/headset.jpg', price: 800 }
  ];
}
