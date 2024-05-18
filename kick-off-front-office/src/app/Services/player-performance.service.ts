import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PlayerPerformance } from '../models/PlayerPerformance';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PlayerPerformanceService {
  private apiUrl = 'http://localhost:3000/perfermance/playerperformances';

  constructor(private http: HttpClient) { }

  // Create
  createPerformance(performance: PlayerPerformance): Observable<PlayerPerformance> {
    return this.http.post<PlayerPerformance>(this.apiUrl, performance);
  }

  // Read All
  getPlayerPerformances(): Observable<PlayerPerformance[]> {
    return this.http.get<PlayerPerformance[]>(this.apiUrl);
  }

  // Read One
  getPerformanceById(id: string): Observable<PlayerPerformance> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<PlayerPerformance>(url);
  }

   // Update
   updatePerformance(id: string, updates: Partial<PlayerPerformance>): Observable<PlayerPerformance> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<PlayerPerformance>(url, updates);
  }
   // Delete
   deletePerformance(id: string): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete(url);
  }
    // Méthode pour appeler l'API d'archivage
    archivePerformance(id: string): Observable<any> {
      return this.http.put(`${this.apiUrl}/${id}/archive`, {});
    }
}
