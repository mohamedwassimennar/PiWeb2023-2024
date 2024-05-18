import { Component, OnInit } from '@angular/core';
import { Prevention } from 'src/app/models/preventions';
import { AuthService } from 'src/app/Services/auth/auth.service';
import { PreventionsService } from 'src/app/Services/preventions.service';

@Component({
  selector: 'app-archived-preventions',
  templateUrl: './archived-preventions.component.html',
  styleUrls: ['./archived-preventions.component.css']
})
export class ArchivedPreventionsComponent implements OnInit {
  archivedPreventions: Prevention[] = [];
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

  constructor(private preventionsService: PreventionsService,
    private authService: AuthService) { }

  ngOnInit(): void {
    this.fetchArchivedPreventions();
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
  fetchArchivedPreventions(): void {
    this.preventionsService.getArchivedPreventions()
      .subscribe(
        archivedPreventions => {
          this.archivedPreventions = archivedPreventions;
        },
        error => {
          console.error('Error fetching archived preventions:', error);
        }
      );
  }

  toggleDetails(prevention: Prevention): void {
    prevention.showDetails = !prevention.showDetails;
}

restorePrevention(preventionId: string): void {
  this.preventionsService.restorePrevention(preventionId)
    .subscribe(
      () => {
        // Rafraîchir la liste des préventions archivées après la restauration réussie
        this.fetchArchivedPreventions();
      },
      error => {
        console.error('Error restoring prevention:', error);
      }
    );
}
}
