import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable, Observer } from 'rxjs';
import { Message } from './message.model';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private readonly localStorageKey = 'chatMessages';

  constructor(private socket: Socket) {}

  sendMessage(msg: Message) {
    this.socket.emit('message', msg);
    this.saveMessageLocally(msg); // Save message locally
  }

  getMessage() {
    return new Observable((observer: Observer<any>) => {
      this.socket.on('message', (message: Message) => {
        observer.next(message);
        this.saveMessageLocally(message); // Save message locally
      });
    });
  }

  private saveMessageLocally(message: Message) {
    let storedMessages: Message[] = JSON.parse(localStorage.getItem(this.localStorageKey) || '[]');
    storedMessages.push(message);
    localStorage.setItem(this.localStorageKey, JSON.stringify(storedMessages));
  }
  
  getStoredMessages(): Message[] {
    return JSON.parse(localStorage.getItem(this.localStorageKey) || '[]');
  }

  clearStoredMessages(): void {
    localStorage.removeItem(this.localStorageKey);
  }
}
