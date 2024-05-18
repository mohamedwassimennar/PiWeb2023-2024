import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Player } from '../models/playerscouted';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlayerscoutedService {

  private apiUrl = 'http://localhost:3000/scout';

  constructor(private http: HttpClient) { }

  create(matchAnalysis: Player): Observable<Player> {
    return this.http.post<Player>(`${this.apiUrl}/addscout`, matchAnalysis);
  }

  getAll(): Observable<Player[]> {
    return this.http.get<Player[]>(`${this.apiUrl}/showscouts`);
  }

  getById(id: string): Observable<Player> {
    return this.http.get<Player>(`${this.apiUrl}/showscout/${id}`);
  }

  update(id: string, matchAnalysis: Player): Observable<Player> {
    return this.http.put<Player>(`${this.apiUrl}/updatescout/${id}`, matchAnalysis);
  }

  delete(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/deletescout/${id}`);
  }

  getFootballNews(): Observable<any> {
    return this.http.get<any>('http://localhost:3000/football-news');
  }
  getMatchSchedules(): Observable<any> {
    return this.http.get<any>('http://localhost:3000/match-schedules');
  }
  getMatchSchedules2(): Observable<any> {
    return this.http.get<any>('http://localhost:3000/match-schedulesSA');
  }
  getMatches(): Observable<any> {
    return this.http.get<any>('http://localhost:3000/scrape');
  }
  archivePlayer(id: string): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/archivescout/${id}`, {});
  }
  

}