import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RecoveryPlan } from 'src/app/models/recoveryPlan.model';
import { RecoveryPlanService } from 'src/app/Services/recoveryPlan.service';
import { AuthService } from 'src/app/Services/auth/auth.service'; // Import du service d'authentification

@Component({
  selector: 'app-recovery',
  templateUrl: './recovery.component.html',
  styleUrls: ['./recovery.component.css']
})
export class RecoveryComponent implements OnInit {
  recoveryPlans: RecoveryPlan[] = [];
  archivedRecoveryPlans: RecoveryPlan[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 9;
  userDetails: any; // Pour stocker les détails de l'utilisateur connecté

  constructor(
    private recoveryPlanService: RecoveryPlanService,
    private router: Router,
    private authService: AuthService // Injection du service d'authentification
  ) { }

  ngOnInit(): void {
    this.fetchRecoveryPlans();
    this.fetchArchivedRecoveryPlans();
    this.fetchUserDetails(); // Appel de la fonction pour récupérer les détails de l'utilisateur connecté
  }

  fetchRecoveryPlans(): void {
    this.recoveryPlanService.getAllRecoveryPlans()
      .subscribe(
        recoveryPlans => {
          this.recoveryPlans = recoveryPlans.filter(plan => !plan.archived);
        },
        error => {
          console.error('Error fetching recovery plans:', error);
        }
      );
  }

  fetchArchivedRecoveryPlans(): void {
    this.recoveryPlanService.getArchivedRecoveryPlans()
      .subscribe(
        archivedRecoveryPlans => {
          this.archivedRecoveryPlans = archivedRecoveryPlans;
        },
        error => {
          console.error('Error fetching archived recovery plans:', error);
        }
      );
  }

  deleteRecoveryPlan(recoveryPlanId: string): void {
    if (this.userDetails?.role === 'doctor') {
      this.recoveryPlanService.deleteRecoveryPlan(recoveryPlanId)
        .subscribe(
          () => {
            console.log('Recovery Plan deleted successfully');
            this.fetchRecoveryPlans();
            this.fetchArchivedRecoveryPlans();
          },
          (error) => console.error('Error deleting recovery plan:', error)
        );
    }
  }

  archiveRecoveryPlan(recoveryPlanId: string): void {
    if (this.userDetails?.role === 'doctor') {
      this.recoveryPlanService.archiveRecoveryPlan(recoveryPlanId)
        .subscribe(
          () => {
            console.log('Recovery Plan archived successfully');
            this.fetchRecoveryPlans();
            this.fetchArchivedRecoveryPlans();
          },
          (error) => console.error('Error archiving recovery plan:', error)
        );
    }
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
