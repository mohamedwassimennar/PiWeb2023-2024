import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Match } from 'src/app/models/match';

@Injectable({
  providedIn: 'root'
})
export class TrainingCalendarService {


  private apiUrl = 'http://localhost:3000/stages'; 

  constructor(private http: HttpClient) { }

  // Méthode pour créer un nouveau match
  createMatch(match: Match): Observable<any> {
    return this.http.post<any>(this.apiUrl, match);
  }

  // Méthode pour récupérer tous les matchs
  getAllMatches(): Observable<Match[]> {
    return this.http.get<Match[]>(this.apiUrl);
  }

  // Méthode pour récupérer un match par son ID
  getMatchById(id: string): Observable<Match> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Match>(url);
  }

  // Méthode pour mettre à jour un match
  updateMatch(id: string, match: Match): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<any>(url, match);
  }

  // Méthode pour supprimer un match
  deleteMatch(id: string): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<any>(url);
  }
}
