import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PerformanceSummary } from 'src/app/models/Performance Summary';
import { AuthService } from 'src/app/Services/auth/auth.service';
import { PerformanceSummaryService } from 'src/app/Services/performance-summary.service';

@Component({
  selector: 'app-archivesummury',
  templateUrl: './archivesummury.component.html',
  styleUrls: ['./archivesummury.component.css']
})
export class ArchivesummuryComponent {
  performances: PerformanceSummary[] = [];
  deleteSuccessMessage:string='';
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
  constructor(private performanceService: PerformanceSummaryService,private router :Router,    private authService: AuthService  ) { }

  ngOnInit(): void {
    this.loadPerformances();
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

  loadPerformances(): void {
    this.performanceService.getAll()
      .subscribe(
        performances => {
          // Filtrer les performances archivées
          this.performances = performances.filter(performance => performance.archived);
        },
        error => {
          console.error('Erreur lors du chargement des performances archivées :', error);
        }
      );
  }

  clearDeleteSuccessMessage(): void {
    this.deleteSuccessMessage = '';
  }

  retourFunction() {
    this.router.navigate(['/perfermancesummary']);

  }
}
