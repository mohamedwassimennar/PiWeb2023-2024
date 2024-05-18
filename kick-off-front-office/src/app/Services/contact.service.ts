import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private apiUrl = 'http://localhost:3000/contact/contact';


  constructor(private http: HttpClient) { }

  sendContactForm(contactData: any) {
    return this.http.post<any>(this.apiUrl, contactData);
  }
}
