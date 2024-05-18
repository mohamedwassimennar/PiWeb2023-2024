import { Component, OnInit } from '@angular/core';
import { RecoveryPlan } from 'src/app/models/recoveries';
import { AuthService } from 'src/app/Services/auth/auth.service';
import { RecoveriesService } from 'src/app/Services/recoveries.service';

@Component({
  selector: 'app-archived-recoveries',
  templateUrl: './archived-recoveries.component.html',
  styleUrls: ['./archived-recoveries.component.css']
})
export class ArchivedRecoveriesComponent implements OnInit {
  archivedRecoveryPlans: RecoveryPlan[] = [];
  backgroundImageSrc: string = '../../../assets/images/fooball.jpg'; // Update this with the path to your image

  isSubMenuOpen: boolean = false;

  isUserSubMenuOpen: boolean = false;
  toggleUserSubMenu() {
    this.isUserSubMenuOpen = !this.isUserSubMenuOpen;
  }
  toggleSubMenu(): void {
    this.isSubMenuOpen = !this.isSubMenuOpen;

  }
  isPerformanceSubMenuOpen: boolean = false;

  togglePerformanceSubMenu() {
    this.isPerformanceSubMenuOpen = !this.isPerformanceSubMenuOpen;
  }

  constructor(private recoveriesService: RecoveriesService,
    private authService: AuthService) { }

  ngOnInit(): void {
    this.fetchArchivedRecoveryPlans();
  }

  fetchArchivedRecoveryPlans(): void {
    this.recoveriesService.getArchivedRecoveryPlans()
      .subscribe(
        archivedRecoveryPlans => {
          this.archivedRecoveryPlans = archivedRecoveryPlans;
        },
        error => {
          console.error('Error fetching archived recovery plans:', error);
        }
      );
  }

  restoreRecoveryPlan(recoveryPlanId: string): void {
    this.recoveriesService.restoreRecoveryPlan(recoveryPlanId)
      .subscribe(
        () => {
          // Réussite de la restauration, actualisez la liste des plans archivés
          this.fetchArchivedRecoveryPlans();
        },
        error => {
          console.error('Error restoring recovery plan:', error);
        }
      );
  }
  logout(): void {
    this.authService.performLogout().subscribe(
      () => {
        console.log('Logout successful');
        // Redirect the user to the login page after successful logout
        window.location.href = 'http://localhost:4200/user/login'; // Assuming the other project is running on port 4201
      },
      error => {
        console.error('Logout error:', error);
      }
    );
  }
}
