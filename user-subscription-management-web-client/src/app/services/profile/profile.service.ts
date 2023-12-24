import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { UserProfile } from '../models/profile';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {
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

  getUserProfile(): Observable<UserProfile | null> {

    return this.http.get<UserProfile>(`${this.apiUrl}/api/userprofile/${this.getUserId()}`)
      .pipe(
        catchError((error: any) => {
          console.error('Error fetching user profile:', error);
          if(error.status === 0)
            this.authService.logout();
          return of(null);
        })
      );
  }

  updateUserProfile(userProfile: UserProfile): Observable<void> {
    userProfile.id = this.getUserId();
    return this.http.put<void>(`${this.apiUrl}/api/userprofile/${userProfile.id}`, userProfile)
      .pipe(
        catchError((error: any) => {
          console.error('Error updating user profile:', error);
          if(error.status === 0)
            this.authService.logout();
          return of();
        })
      );
  }

}
