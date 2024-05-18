import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatchAnalysis } from 'src/app/models/Match Analysis';
import { AuthService } from 'src/app/Services/auth/auth.service';
import { MatchAnalysisService } from 'src/app/Services/match-analysis.service';

@Component({
  selector: 'app-archive-matchs',
  templateUrl: './archive-matchs.component.html',
  styleUrls: ['./archive-matchs.component.css']
})
export class ArchiveMatchsComponent {
  backgroundImageSrc: string = '../../../assets/images/fooball.jpg'; // Update this with the path to your image
  matchAnalyses: MatchAnalysis[]= [];
  successAlert: boolean = false;
  deleteSuccessMessage:string='';
  

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

  
  constructor(private matchAnalysisService: MatchAnalysisService,private router: Router,    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.loadMatchAnalyses();
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
  loadMatchAnalyses(): void {
    this.matchAnalysisService.getAll()
      .subscribe(
        matchAnalyses => {
          // Filtrer les analyses de match archivées
          this.matchAnalyses = matchAnalyses.filter(analysis => analysis.archived);
        },
        error => {
          console.error('Erreur lors du chargement des analyses de match :', error);
        }
      );
}

  clearDeleteSuccessMessage(): void {
    this.deleteSuccessMessage = '';
  }

  retourFunction() {
    console.log("Bouton Retour cliqué !");
    this.router.navigate(['/matchAnalysis']);

  }
}
