import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Injury } from 'src/app/models/injury.model';
import { InjuryService } from 'src/app/Services/injury.service';
import { AuthService } from 'src/app/Services/auth/auth.service'; // Ajout du service d'authentification

@Component({
  selector: 'app-injuries',
  templateUrl: './injuries.component.html',
  styleUrls: ['./injuries.component.css']
})
export class InjuriesComponent implements OnInit {
  injuries: Injury[] = [];
  archivedInjuries: Injury[] = [];
  currentPage: number = 1; 
  itemsPerPage: number = 9;
  userDetails: any; // Pour stocker les détails de l'utilisateur connecté

  constructor(
    private injuryService: InjuryService,
    private router: Router,
    private authService: AuthService // Injection du service d'authentification
  ) { }

  ngOnInit(): void {
    this.fetchInjuries();
    this.fetchUserDetails(); // Appel de la fonction pour récupérer les détails de l'utilisateur connecté
  }

  fetchInjuries(): void {
    this.injuryService.getAllInjuries()
      .subscribe(
        injuries => {
          this.injuries = injuries.filter(injury => !injury.archived);
          this.archivedInjuries = injuries.filter(injury => injury.archived);
        },
        error => {
          console.error('Error fetching injuries:', error);
        }
      );
  }

  deleteInjury(injuryId: string): void {
    this.injuryService.deleteInjury(injuryId)
      .subscribe(
        () => {
          console.log('Injury deleted successfully');
          this.fetchInjuries();
        },
        (error) => {
          console.error('Error deleting injury:', error);
        }
      );
  }

  archiveInjury(injuryId: string): void {
    this.injuryService.archiveInjury(injuryId)
      .subscribe(
        () => {
          console.log('Injury archived successfully');
          this.injuries = this.injuries.filter(injury => injury._id !== injuryId);
        },
        (error) => {
          console.error('Error archiving injury:', error);
        }
      );
  }

  // Fonction pour récupérer les détails de l'utilisateur connecté
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
}
