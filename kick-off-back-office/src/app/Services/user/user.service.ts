import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/User.Model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  getAllUsersByRole(role: string): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/users/${role}`);
  }
  archiveUser(id: string): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/users/${id}/archive`, {});
  }
  unarchiveUser(id: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/users/${id}/unarchive`, {});
  }
  getArchivedUsersByRole(role: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/users/archived/${role}`);
  }
  countVerifiedUsersByRole(role: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/users/count/verified/${role}`);
  }

  countUnverifiedUsersByRole(role: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/users/count/unverified/${role}`);
  }
  updateUser(id: string, newData: any): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/users/${id}`, newData);
  }

  deleteUser(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/users/${id}`);
  }
  
}
