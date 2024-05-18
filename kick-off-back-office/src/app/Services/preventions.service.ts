import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Prevention } from '../models/preventions';

@Injectable({
  providedIn: 'root'
})
export class PreventionsService {
  private baseUrl = 'http://localhost:3000';

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

    // Méthode pour restaurer une prévention archivée
    restorePrevention(preventionId: string): Observable<void> {
      return this.http.put<void>(`${this.baseUrl}/prevention/restore/${preventionId}`, {});
    }
}
