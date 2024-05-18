import { Component, OnInit } from '@angular/core';
import { Injury } from 'src/app/models/injuries';
import { AuthService } from 'src/app/Services/auth/auth.service';
import { InjuriesService } from 'src/app/Services/injuries.service';

@Component({
  selector: 'app-archived-injuries',
  templateUrl: './archived-injuries.component.html',
  styleUrls: ['./archived-injuries.component.css']
})
export class ArchivedInjuriesComponent implements OnInit {
  archivedInjuries: Injury[] = [];
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

  constructor(private injuriesService: InjuriesService,
    private authService: AuthService) { }

  ngOnInit(): void {
    this.fetchArchivedInjuries();
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
  fetchArchivedInjuries(): void {
    this.injuriesService.getArchivedInjuries()
      .subscribe(
        injuries => {
          this.archivedInjuries = injuries;
        },
        error => {
          console.error('Error fetching archived injuries:', error);
        }
      );
  }

  restoreInjury(injuryId: string): void {
    this.injuriesService.restoreInjury(injuryId)
      .subscribe(
        () => {
          // Rafraîchir la liste des blessures archivées après la restauration réussie
          this.fetchArchivedInjuries();
        },
        error => {
          console.error('Error restoring injury:', error);
        }
      );
  }
}