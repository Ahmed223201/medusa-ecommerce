import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  salePrice?: number;
  onSale?: boolean;
  category: string;
  image: string;
  rating: number;
  stock: number;
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'http://localhost:9000';

  constructor(private http: HttpClient) {}

  async getProducts(): Promise<Product[]> {
    // For now, return mock data until Medusa backend is set up
    return [
      {
        id: '1',
        title: 'Gaming Laptop Pro',
        description: 'High-performance gaming laptop with RTX 4080, 32GB RAM, and 1TB SSD.',
        price: 1999.99,
        salePrice: 1799.99,
        onSale: true,
        category: 'Laptops',
        image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=500',
        rating: 4.8,
        stock: 5
      },
      {
        id: '2',
        title: 'Mechanical Gaming Keyboard',
        description: 'RGB mechanical keyboard with Cherry MX switches and customizable macros.',
        price: 149.99,
        category: 'Peripherals',
        image: 'https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=500',
        rating: 4.7,
        stock: 15
      },
      {
        id: '3',
        title: 'Gaming Mouse',
        description: '16000 DPI gaming mouse with programmable buttons and RGB lighting.',
        price: 79.99,
        salePrice: 59.99,
        onSale: true,
        category: 'Peripherals',
        image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500',
        rating: 4.6,
        stock: 20
      },
      {
        id: '4',
        title: '4K Gaming Monitor',
        description: '27-inch 4K monitor with 144Hz refresh rate and 1ms response time.',
        price: 599.99,
        category: 'Monitors',
        image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=500',
        rating: 4.9,
        stock: 8
      },
      {
        id: '5',
        title: 'Gaming PC Desktop',
        description: 'Custom gaming PC with RTX 4090, Ryzen 9, 64GB RAM, and 2TB NVMe SSD.',
        price: 2999.99,
        salePrice: 2799.99,
        onSale: true,
        category: 'Desktop PCs',
        image: 'https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=500',
        rating: 5.0,
        stock: 3
      },
      {
        id: '6',
        title: 'Gaming Headset',
        description: 'Wireless gaming headset with 7.1 surround sound and noise-canceling mic.',
        price: 199.99,
        category: 'Audio',
        image: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=500',
        rating: 4.5,
        stock: 12
      }
    ];
  }
}
