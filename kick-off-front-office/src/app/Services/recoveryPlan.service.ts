import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RecoveryPlan } from '../models/recoveryPlan.model';

@Injectable({
  providedIn: 'root'
})
export class RecoveryPlanService {
  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  getAllRecoveryPlans(): Observable<RecoveryPlan[]> {
    return this.http.get<RecoveryPlan[]>(`${this.baseUrl}/recovery/allrecoveryplans`);
  }

  getArchivedRecoveryPlans(): Observable<RecoveryPlan[]> {
    return this.http.get<RecoveryPlan[]>(`${this.baseUrl}/recovery/archive/archivedRecovery`);
  }

  deleteRecoveryPlan(recoveryPlanId: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/recovery/delete/${recoveryPlanId}`);
  }

  archiveRecoveryPlan(recoveryPlanId: string): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/recovery/archive/${recoveryPlanId}`, {});
  }
}
