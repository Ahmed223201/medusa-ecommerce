import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${environment.medusaApi}/store/auth`, {
      email,
      password
    }).pipe(
      tap((response: any) => {
        if (response.customer) {
          this.isAuthenticatedSubject.next(true);
          localStorage.setItem('currentUser', JSON.stringify(response.customer));
        }
      })
    );
  }

  logout(): void {
    this.http.delete(`${environment.medusaApi}/store/auth`).subscribe(() => {
      this.isAuthenticatedSubject.next(false);
      localStorage.removeItem('currentUser');
    });
  }

  checkAuthStatus(): void {
    const user = localStorage.getItem('currentUser');
    this.isAuthenticatedSubject.next(!!user);
  }
}
