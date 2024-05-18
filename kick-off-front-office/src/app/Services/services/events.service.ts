import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Reser } from 'src/app/models/event';
import { Meet } from 'src/app/models/meet';

@Injectable({
  providedIn: 'root'
})
export class EventsService {
  private apiUrl = 'http://localhost:3000/events'; 
  private apiUr = 'http://localhost:3000/meets'; 

  constructor(private http: HttpClient) { }

  
  createEvent(reser: Reser): Observable<any> {
    return this.http.post<any>(this.apiUrl, reser);
  }

  getAllEvents(): Observable<Reser[]> {
    return this.http.get<Reser[]>(this.apiUrl);
  }


  getEventById(id: string): Observable<Reser> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Reser>(url);
  }

 
  updateEvent(id: string, reser: Reser): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<any>(url,reser);
  }


  deleteEvent(id: string): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<any>(url);
  }
  getPlayersForEvent(eventId: string): Observable<{ nom: string, prenom: string }[]> {
    const playersUrl = `${this.apiUrl}/${eventId}/players`;
    return this.http.get<{ nom: string, prenom: string }[]>(playersUrl);
  }
  getEventsByPlayerId(playerId: string): Observable<Reser[]> {
    const url = `${this.apiUrl}/player/${playerId}`;
    return this.http.get<Reser[]>(url);
  }

  getAllMeets(): Observable<Meet[]> {
    return this.http.get<Meet[]>(this.apiUr)

  }
 
  createMeet(meet: Meet): Observable<any> {
    return this.http.post<any>('http://localhost:3000/meets', meet);
  }
  updatemeet(id: string, meet:Meet): Observable<any> {
    const url = `${this.apiUr}/${id}`;
    return this.http.put<any>(url,meet);
  }
  getmeetById(id: string): Observable<Meet> {
    const url = `${this.apiUr}/${id}`;
    return this.http.get<Meet>(url);
  }
  deleteMeet(id: string): Observable<any> {
    const url = `${this.apiUr}/${id}`;
    return this.http.delete<any>(url);
  }
}