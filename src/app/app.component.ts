import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { ProductsComponent } from './components/products/products.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, ProductsComponent],
  template: `
    <div class="app-container">
      <header>
        <h1>{{ title }}</h1>
      </header>
      <main>
        <app-products></app-products>
        <router-outlet></router-outlet>
      </main>
    </div>
  `,
  styles: [`
    .app-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 20px;
    }
    header {
      text-align: center;
      margin-bottom: 30px;
    }
    h1 {
      color: #333;
      font-size: 2.5em;
    }
  `]
})
export class AppComponent {
  title = 'E-Commerce Store';
}
