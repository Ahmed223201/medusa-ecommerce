import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { NotificationService } from './notification.service';

export interface User {
  id: string;
  email: string;
  isAdmin: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  private currentUserSubject = new BehaviorSubject<User | null>(null);

  isAuthenticated$ = this.isAuthenticatedSubject.asObservable();
  currentUser$ = this.currentUserSubject.asObservable();
  isAdmin$ = this.currentUser$.pipe(
    map(user => user?.isAdmin === true)
  );

  constructor(
    private router: Router,
    private http: HttpClient,
    private notificationService: NotificationService
  ) {
    this.checkExistingSession();
  }

  private checkExistingSession() {
    const isAdmin = localStorage.getItem('is_admin');
    
    if (isAdmin === 'true') {
      this.setAdminSession();
    }
  }

  private clearSession() {
    localStorage.removeItem('is_admin');
    this.isAuthenticatedSubject.next(false);
    this.currentUserSubject.next(null);
  }

  private setAdminSession() {
    const adminUser: User = {
      id: 'admin',
      email: 'admin',
      isAdmin: true
    };
    this.currentUserSubject.next(adminUser);
    this.isAuthenticatedSubject.next(true);
    localStorage.setItem('is_admin', 'true');
  }

  async login(email: string, password: string): Promise<boolean> {
    try {
      // Only allow admin login with hardcoded credentials
      if (email === 'admin' && password === 'admin') {
        this.setAdminSession();
        this.notificationService.show('Welcome, Administrator!', 'success');
        this.router.navigate(['/admin']);
        return true;
      }
      this.notificationService.show('Invalid administrator credentials', 'error');
      return false;
    } catch (error) {
      this.notificationService.show('Login failed', 'error');
      return false;
    }
  }

  async logout() {
    this.clearSession();
    this.notificationService.show('Successfully logged out', 'success');
    this.router.navigate(['/administrator']);
  }

  isAdmin(): boolean {
    const user = this.currentUserSubject.value;
    return user?.isAdmin === true;
  }
}
