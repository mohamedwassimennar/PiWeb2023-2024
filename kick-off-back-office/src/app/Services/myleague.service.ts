import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MyLeague } from '../models/MyLeague';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MyleagueService {
  private apiUrl = 'http://localhost:3000/match';

  constructor(private http: HttpClient) { }

  create(matchAnalysis: MyLeague): Observable<MyLeague> {
    return this.http.post<MyLeague>(`${this.apiUrl}/addmatch`, matchAnalysis);
  }

  getAll(): Observable<MyLeague[]> {
    return this.http.get<MyLeague[]>(`${this.apiUrl}/showmatches`);
  }

  getById(id: string): Observable<MyLeague> {
    return this.http.get<MyLeague>(`${this.apiUrl}/showmatch/${id}`);
  }

  update(id: string, matchAnalysis: MyLeague): Observable<MyLeague> {
    return this.http.put<MyLeague>(`${this.apiUrl}/updatematch/${id}`, matchAnalysis);
  }

  delete(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/deletematch/${id}`);
  }

  uploadCSV(formData: FormData): Observable<any> {
    return this.http.post<any>(`http://localhost:3000/upload`, formData);
  }
  archivePlayer(id: string): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/archivematch/${id}`, {});
  }
}
