import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable, of } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { User } from 'src/app/models/User.Model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:3000/api';
  private otherProjectUrl ='http://localhost:4201'

  //headers = new Hea

  constructor(private http: HttpClient, private cookieService: CookieService) { }


  loginUser(credentials: any): Observable<boolean> {
    return this.http.post<any>(`${this.apiUrl}/login`, credentials)
      .pipe(
        tap(response => {
          if (response.role === 'admin') {
            window.location.href = `${this.otherProjectUrl}/dash?token=${response.token}`;
          } else {
            this.cookieService.set('token', response.token);
          }
        }),
        map(response => response.role === 'admin')
      );
  }
  confirmMail(role: string, code: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/confirm/${role}?code=${code}`);
  }
  forgotPassword(email: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/forgotpwd`, { email });
  }
  getToken(): string | undefined {
    return this.cookieService.get('token');
  }

  setToken(token: string): void {
    this.cookieService.set('token', token);
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

 
  getUserDetails(): Observable<any> {
    const token = this.cookieService.get('token');

    return this.http.get<any>(`${this.apiUrl}/user/details`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }
 
  getUsersWithRoles(role: string): Observable<any[]> {
    // Appel à votre backend pour récupérer les utilisateurs avec le rôle spécifié
    return this.http.get<any[]>(`${this.apiUrl}/users/${role}`);
  }
}