import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MatchAnalysis } from '../models/Match Analysis';

@Injectable({
  providedIn: 'root'
})
export class MatchAnalysisService {
  private apiUrl = 'http://localhost:3000/matchanalysis/matchanalyses';

  constructor(private http: HttpClient) { }
  create(matchAnalysis: MatchAnalysis): Observable<MatchAnalysis> {
    return this.http.post<MatchAnalysis>(this.apiUrl, matchAnalysis);
  }

  getAll(): Observable<MatchAnalysis[]> {
    return this.http.get<MatchAnalysis[]>(this.apiUrl);
  }

  getById(id: string): Observable<MatchAnalysis> {
    return this.http.get<MatchAnalysis>(`${this.apiUrl}/${id}`);
  }

  update(id: string, matchAnalysis: MatchAnalysis): Observable<MatchAnalysis> {
    return this.http.put<MatchAnalysis>(`${this.apiUrl}/${id}`, matchAnalysis);
  }

  delete(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
  // Méthode pour appeler l'API d'archivage
  archiveMatchs(id: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}/archive`, {});
  }
}
