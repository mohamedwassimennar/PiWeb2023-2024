import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatchAnalysis } from 'src/app/models/Match Analysis';
import { AuthService } from 'src/app/Services/auth/auth.service';
import { MatchAnalysisService } from 'src/app/Services/match-analysis.service';


@Component({
  selector: 'app-match-analysis-list',
  templateUrl: './match-analysis-list.component.html',
  styleUrls: ['./match-analysis-list.component.css']
})
export class MatchAnalysisListComponent implements OnInit {
  matchAnalyses: MatchAnalysis[]= [];
  successAlert: boolean = false;
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


  constructor(private matchAnalysisService: MatchAnalysisService   , private authService: AuthService,
    private router: Router) { }

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
          this.matchAnalyses = matchAnalyses.filter(analysis => !analysis.archived);

        },
        error => {
          console.error('Error fetching match analyses:', error);
        }
      );
  }
  navigateToarchiveMatchs(): void {
    this.router.navigateByUrl('/archiveMatchs');
  }
  clearDeleteSuccessMessage(): void {
    this.deleteSuccessMessage = '';
  }
  archiveMatch(id: string): void {
     // Vérifier si la performance est déjà archivée
     if (this.isMatchArchived(id)) {
      this.deleteSuccessMessage ='Cette performance est déjà archivée.';
      return;
  }
    if (confirm('Êtes-vous sûr de vouloir archiver cette performance ?')) {
        this.matchAnalysisService.archiveMatchs(id).subscribe(
            () => {
                // Recharge la liste des performances après l'archivage
                this.loadMatchAnalyses();
                // Affiche un message de succès
                this.deleteSuccessMessage = "Performance archivée avec succès!";
            },
            (error) => {
                console.log(error);
                // Gérer les erreurs
                alert('Une erreur s\'est produite lors de l\'archivage de la performance.');
            }
        );
    }
}
isMatchArchived(id: string): boolean {
  // Récupérer la performance correspondant à l'identifiant
  const matchedPerformance = this.matchAnalyses.find(performance => performance._id === id);

  // Vérifier si la performance existe et si elle est archivée
  if (matchedPerformance && matchedPerformance.archived) {
      return true; // Performance déjà archivée
  } else {
      return false; // Performance non archivée
  }
}

}
