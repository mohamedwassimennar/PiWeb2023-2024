import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Meet, Reser, TrainingPlan } from '../models/training.model';
import { Match} from '../models/training.model';

@Injectable({
  providedIn: 'root'
})
export class TrainingService {
  private apiUrl = 'http://localhost:3000/events'; 
  private apiUrl1 = 'http://localhost:3000/stages'; 
  private apiUrl3 = 'http://localhost:3000/trainingPlans';
  private apiUr = 'http://localhost:3000/meets'; 

  constructor(private http: HttpClient) { } 
   getAllEvents(): Observable<Reser[]> {
    return this.http.get<Reser[]>(this.apiUrl);
  }

updateEvent(id: string, reser: Reser): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<any>(url,reser);
  }

  getAllMatches(): Observable<Match[]> {
    return this.http.get<Match[]>(this.apiUrl1);
  }
  getAllTrainingPlans(): Observable<TrainingPlan[]> {
    return this.http.get<TrainingPlan[]>(this.apiUrl3);
  }
  getAllMeets(): Observable<Meet[]> {
    return this.http.get<Meet[]>(this.apiUr)

  }
  updatemeet(id: string, meet:Meet): Observable<any> {
    const url = `${this.apiUr}/${id}`;
    return this.http.put<any>(url,meet);
  }
  updateMatch(id: string, match: Match): Observable<any> {
    const url = `${this.apiUrl1}/${id}`;
    return this.http.put<any>(url, match);
  }

  updateTrainingPlan(planId: string, trainingPlan: TrainingPlan): Observable<any> {
    const url = `${this.apiUrl3}/${planId}`;
    return this.http.put<any>(url, trainingPlan);
  }
  archiveMeet(meetId: string): Observable<Meet> {
    return this.http.put<Meet>(`${this.apiUr}/${meetId}/archive`, {});
  }
  archiveEvent(id: string): Observable<Event> {
    return this.http.put<Event>(`${this.apiUrl}/${id}/archive`, {});
  }
  archiveStage(id: string): Observable<Event> {
    return this.http.put<Event>(`${this.apiUrl1}/${id}/archive`, {});
  }
  archiveP(id: string): Observable<Event> {
    return this.http.put<Event>(`${this.apiUrl3}/${id}/archive`, {});
  }
 
}
