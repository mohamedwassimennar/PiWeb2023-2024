import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth/auth.service';

@Component({
  selector: 'app-health',
  templateUrl: './health.component.html',
  styleUrls: ['./health.component.css']
})
export class HealthComponent {
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

  constructor(private router: Router,
    private authService: AuthService) { }

  navigateToInjuries() {
    this.router.navigate(['/injuries']);
  }

  navigateToRecoveries() {
    this.router.navigate(['/recoveries']);
  }

  navigateToPreventions() {
    this.router.navigate(['/preventions']);
  }

  navigateToArchivedInjuries() {
    this.router.navigate(['/archivedinjuries']);
  }

  navigateToArchivedRecoveries() {
    this.router.navigate(['/archivedrecoveries']);
  }

  navigateToArchivedPreventions() {
    this.router.navigate(['/archivedpreventions']);
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
