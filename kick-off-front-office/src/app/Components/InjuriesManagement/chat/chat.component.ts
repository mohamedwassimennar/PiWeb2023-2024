import { Component, OnInit } from '@angular/core';
import { ChatService } from '../chat.service';
import { Message } from '../message.model';
import { AuthService } from 'src/app/Services/auth/auth.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent implements OnInit {
  messageList: Message[] = [];
  message: Message = {};
  dateNow: Date = new Date();
  userDetails: any;
  usersWithRoles: any[] = [];
  selectedUser: any = null;

  constructor(
    private chatService: ChatService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.getMessages();
    this.fetchUserDetails();
    this.fetchUserDetailsAndUsers();
    this.fetchUsersWithRoles();
  }

  sendMessage() {
    if (!this.userDetails) {
      console.error('User details not available.');
      return;
    }

    this.message = {
      ...this.message,
      sender: `${this.userDetails.firstName} ${this.userDetails.lastName}`,
      date: this.dateNow
    };

    // Si un utilisateur est sélectionné, définissez le destinataire du message
    if (this.selectedUser) {
      this.message.recipient = this.selectedUser.username;
    }

    this.chatService.sendMessage(this.message);
    // Clear message content after sending
    this.message.message = '';
  }

  getMessages() {
    this.messageList = this.chatService.getStoredMessages();
    this.chatService.getMessage().subscribe((message: Message) => {
      this.messageList.push(message);
    });
  }

  fetchUserDetails(): void {
    this.authService.getUserDetails().subscribe(
      (response) => {
        this.userDetails = response;
      },
      (error) => {
        console.error('Error fetching user details:', error);
      }
    );
  }

  fetchUserDetailsAndUsers(): void {
    // D'abord, récupérez les détails de l'utilisateur
    this.fetchUserDetails();
  
    // Ensuite, attendez que les détails de l'utilisateur soient disponibles avant de récupérer les utilisateurs avec les rôles appropriés
    this.authService.getUserDetails().subscribe(
      (response) => {
        this.userDetails = response;
        this.fetchUsersWithRoles(); // Maintenant que userDetails est défini, appelez fetchUsersWithRoles
      },
      (error) => {
        console.error('Error fetching user details:', error);
      }
    );
  }

  fetchUsersWithRoles(): void {
    let roleToFetch: string;
  
    // Déterminez quel rôle d'utilisateur est connecté
    if (this.userDetails && this.userDetails.role === 'doctor') {
      roleToFetch = 'player';
    } else if (this.userDetails && this.userDetails.role === 'player') {
      roleToFetch = 'doctor';
    } else {
      console.error('User role not found or not supported.');
      return;
    }
  
    // Récupérez les utilisateurs avec le rôle déterminé
    this.authService.getUsersWithRoles(roleToFetch).subscribe(
      (users) => {
        this.usersWithRoles = users;
      },
      (error) => {
        console.error('Error fetching users with roles:', error);
      }
    );
  }
  
  selectUser(user: any): void {
    this.selectedUser = user;
  }

  clearMessageHistory(): void {
    this.chatService.clearStoredMessages();
    this.messageList = [];
  }
}
