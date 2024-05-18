import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Prevention } from '../models/prevention.model';

@Injectable({
  providedIn: 'root'
})
export class PreventionService {
  private baseUrl = 'http://localhost:3000'; // Assurez-vous de changer l'URL de base en fonction de votre environnement

  constructor(private http: HttpClient) { }

  getAllPreventions(): Observable<Prevention[]> {
    return this.http.get<Prevention[]>(`${this.baseUrl}/prevention/allpreventions`);
  }

  getArchivedPreventions(): Observable<Prevention[]> {
    return this.http.get<Prevention[]>(`${this.baseUrl}/prevention/archive/archivedPrevention`);
  }

  deletePrevention(preventionId: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/prevention/delete/${preventionId}`);
  }

  archivePrevention(preventionId: string): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/prevention/archive/${preventionId}`, {});
  }
}
