import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Subscription } from '../models/subscription';
import { UserSubscriptionsResponse } from '../models/user-subscriptions';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {
  private apiUrl = 'http://localhost:5108';

  constructor(private http: HttpClient, private router: Router, private authService: AuthService) { }

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('jwtToken');

    if (!token) {
      this.router.navigate(['']);
      return new HttpHeaders();
    }

    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  private getUserId(): number {
    const id = localStorage.getItem('userId')
    if (!id) {
      this.router.navigate(['']);
      return 0;
    }
    return parseInt(localStorage.getItem('userId') ?? "")
  }

  getSubscriptions(): Observable<Subscription[]> {
    return this.http.get<Subscription[]>(`${this.apiUrl}/api/subscriptions`)
      .pipe(
        catchError((error: any) => {
          console.error('Error fetching subscriptions:', error);
          if(error.status === 0)
            this.authService.logout();
          return of([]);
        })
      );
  }

  getUserSubscriptions(): Observable<UserSubscriptionsResponse | null> {

    return this.http.get<UserSubscriptionsResponse>(`${this.apiUrl}/api/usersubscription/${this.getUserId()}`)
      .pipe(
        catchError((error: any) => {
          console.error('Error fetching user subscriptions:', error);
          if(error.status === 0)
            this.authService.logout();
          return of(null);
        })
      );
  }

  addUserSubscription(subscriptionKey: string): Observable<void> {

    const params = new HttpParams()
      .set('userId', localStorage.getItem('userId') ?? "")
      .set('subscriptionKey', subscriptionKey);
    return this.http.post<void>(`${this.apiUrl}/api/usersubscription`, null, { params: params })
      .pipe(
        catchError((error: any) => {
          console.error('Error addding user subscription:', error);
          if(error.status === 0)
            this.authService.logout();
          return of();
        })
      );
  }

  deleteUserSubscription(subscriptionKey: string): Observable<void> {
  
    const params = new HttpParams()
      .set('userId', localStorage.getItem('userId') ?? "")
      .set('subscriptionKey', subscriptionKey);
  
    const options = { params: params };
  
    return this.http.delete<void>(`${this.apiUrl}/api/usersubscription`, options)
      .pipe(
        catchError((error: any) => {
          console.error('Error deleting user subscription:', error);
          if(error.status === 0)
            this.authService.logout();
          return of();
        })
      );
  }
  
}
