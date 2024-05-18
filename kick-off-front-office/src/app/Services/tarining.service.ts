import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {TrainingPlan}from '../models/trainingPlan';
@Injectable({
  providedIn: 'root'
})
export class TrainingService {
  private apiUrl = 'http://localhost:3000/trainingPlans';

  constructor(private http: HttpClient) { }

  createTrainingPlan(trainingPlan: TrainingPlan): Observable<any> {
    return this.http.post<any>(this.apiUrl, trainingPlan);
  }

  getAllTrainingPlans(): Observable<TrainingPlan[]> {
    return this.http.get<TrainingPlan[]>(this.apiUrl);
  }

  getTrainingPlanById(planId: string): Observable<TrainingPlan> {
    const url = `${this.apiUrl}/${planId}`;
    return this.http.get<TrainingPlan>(url);
  }

  updateTrainingPlan(planId: string, trainingPlan: TrainingPlan): Observable<any> {
    const url = `${this.apiUrl}/${planId}`;
    return this.http.put<any>(url, trainingPlan);
  }

  deleteTrainingPlan(planId: string): Observable<any> {
    const url = `${this.apiUrl}/${planId}`;
    return this.http.delete<any>(url);
  }
}


