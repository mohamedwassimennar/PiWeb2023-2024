import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { map } from 'rxjs/operators'; 


@Injectable({
  providedIn: 'root'
})
export class DataServiceAiService {
  private apiUrl = 'http://127.0.0.1:5000';

  

  constructor(private http: HttpClient) { }

/*
  processVideo(videoFile: File): Observable<any> {
    const formData = new FormData();
    formData.append('video', videoFile);

    return this.http.post<any>(this.apiUrl, formData);
  }

  fetchResults(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/get_results`);
  }
  */
  processVideo(videoFile: File): Observable<any> {
    const formData = new FormData();
    formData.append('video', videoFile);

    return this.http.post<any>(`${this.apiUrl}/process_video`, formData);
  }

  fetchResults() {
    return this.http.get<any>(`${this.apiUrl}/get_results`);
  }

  getVideo(filename: string): Observable<any> {
    const url = `${this.apiUrl}/output_videos/${filename}`;
    return this.http.get<any>(url);
  }
  getVideoPath(): Observable<any> {
    const url = `${this.apiUrl}/get_results`;
    return this.http.get<any>(url);
  }
  
  
}