import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Prevention } from 'src/app/models/prevention.model';
import { PreventionService } from 'src/app/Services/prevention.service';
import { AuthService } from 'src/app/Services/auth/auth.service'; // Import du service d'authentification

@Component({
  selector: 'app-prevention',
  templateUrl: './prevention.component.html',
  styleUrls: ['./prevention.component.css']
})
export class PreventionComponent implements OnInit {
  preventions: Prevention[] = [];
  archivedPreventions: Prevention[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 9;
  userDetails: any; // Pour stocker les détails de l'utilisateur connecté

  constructor(
    private preventionService: PreventionService,
    private router: Router,
    private authService: AuthService // Injection du service d'authentification
  ) { }

  ngOnInit(): void {
    this.fetchPreventions();
    this.fetchUserDetails(); // Appel de la fonction pour récupérer les détails de l'utilisateur connecté
  }

  fetchPreventions(): void {
    this.preventionService.getAllPreventions()
      .subscribe(
        (preventions: Prevention[]) => {
          this.preventions = preventions.filter(prevention => !prevention.archived);
          this.archivedPreventions = preventions.filter(prevention => prevention.archived);
        },
        (error) => {
          console.error('Error fetching preventions:', error);
        }
      );
  }

  deletePrevention(preventionId: string): void {
    this.preventionService.deletePrevention(preventionId)
      .subscribe(
        () => {
          console.log('Prevention deleted successfully');
          this.fetchPreventions();
        },
        (error) => {
          console.error('Error deleting prevention:', error);
        }
      );
  }

  archivePrevention(preventionId: string): void {
    this.preventionService.archivePrevention(preventionId)
      .subscribe(
        () => {
          console.log('Prevention archived successfully');
          this.fetchPreventions();
        },
        (error) => {
          console.error('Error archiving prevention:', error);
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
