import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PerformanceSummary } from '../models/Performance Summary';


@Injectable({
  providedIn: 'root'
})
export class PerformanceSummaryService {
  private apiUrl = 'http://localhost:3000/performancesummariesroutes/performancesummaries';

  constructor(private http: HttpClient) { }

  getAll(): Observable<PerformanceSummary[]> {
    return this.http.get<PerformanceSummary[]>(this.apiUrl);
  }

  getById(id: string): Observable<PerformanceSummary> {
    return this.http.get<PerformanceSummary>(`${this.apiUrl}/${id}`);
  }
  // Méthode pour appeler l'API d'archivage
  archivePerformancesummury(id: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}/archive`, {});
  }
 
}
