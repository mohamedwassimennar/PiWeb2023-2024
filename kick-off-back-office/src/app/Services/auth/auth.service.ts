import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:3000/api';
  private google = 'http://localhost:3000';

  constructor(private http: HttpClient, private cookieService: CookieService) { }

  loginUser(credentials: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, credentials)
      .pipe(map(response => {
        // Store the token in a cookie
        this.cookieService.set('token', response.token);
        return response;
      })
      );
  }
  registerUser(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, userData);
  }
  registerPlayer(playerData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/registerPlayersFromJson`, playerData);
  }
  
  confirmEmail(confirmationCode: string, role: string) {
    const url = `http://localhost:3000/api/auth/confirm?code=${confirmationCode}&role=${role}`;
    return this.http.get(url);
  }
  
  logout(): Observable<any> {
    return this.http.post(`${this.apiUrl}/logout`, {});
  }

  clearToken(): void {
    this.cookieService.delete('token');
  }

  performLogout(): Observable<any> {
    return this.logout()
      .pipe(
        switchMap(() => {
          this.clearToken();
          return of(null);
        })
      );
  }

  isLoggedIn(): boolean {
    return this.cookieService.check('token');
  }

  authenticateWithGoogle(): Observable<any> {
    return this.http.get(`${this.google}/auth/google`, { withCredentials: true });
  }
  
  getUserDetails(): Observable<any> {
    const token = this.cookieService.get('token');

    return this.http.get<any>(`${this.apiUrl}/user/details`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }
  getAdminDetails(token: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/admin`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  isAdmin(): boolean {
    const token = this.cookieService.get('token');
    
    return true; // Example logic, replace with actual implementation
}

getToken(): string | undefined {
    return this.cookieService.get('token');
  }
  setToken(token: string): void {
    this.cookieService.set('token', token);
  }
}
