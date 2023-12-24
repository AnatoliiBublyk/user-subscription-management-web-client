import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Login } from '../models/login';
import { JwtResponse } from '../models/jwt-response';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:5108';

  constructor(private http: HttpClient, private router: Router) {}

  login(credentials: Login): Observable<JwtResponse> {
    return this.http.post<JwtResponse>(`${this.apiUrl}/api/authorization`, credentials);
  }

  logout(): void {
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('userId');
    this.router.navigate(['/login'])
  }
}
