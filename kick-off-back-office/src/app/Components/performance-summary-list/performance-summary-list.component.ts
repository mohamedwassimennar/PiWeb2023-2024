import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth/auth.service';
import { PerformanceSummaryService } from 'src/app/Services/performance-summary.service';
import { PerformanceSummary } from 'src/app/models/Performance Summary';

@Component({
  selector: 'app-performance-summary-list',
  templateUrl: './performance-summary-list.component.html',
  styleUrls: ['./performance-summary-list.component.css']
})
export class PerformanceSummaryListComponent implements OnInit {
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

  constructor(private performanceService: PerformanceSummaryService,private router:Router,    private authService: AuthService  ) { }
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
    this.performanceService.getAll().subscribe(
      performances => {
        this.performances = performances.filter(performance => !performance.archived);
      },
      error => {
        console.error('Error fetching performances:', error);
      }
    );
  }

  navigateToarchiveSummury(): void {
    this.router.navigateByUrl('/archiveSummury');
  }
  clearDeleteSuccessMessage(): void {
    this.deleteSuccessMessage = '';
  }

  
  archivesummury(id: string): void {
    // Vérifier si la performance est déjà archivée
    if (this.issummuryArchived(id)) {
     this.deleteSuccessMessage ='Cette performance est déjà archivée.';
     return;
 }
   if (confirm('Êtes-vous sûr de vouloir archiver cette performance ?')) {
       this.performanceService.archivePerformancesummury(id).subscribe(
           () => {
               // Recharge la liste des performances après l'archivage
               this.loadPerformances();
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
issummuryArchived(id: string): boolean {
  // Rechercher la performance correspondant à l'identifiant
  const matchedPerformance = this.performances.find(performance => performance._id === id);

  // Vérifier si la performance existe et si elle est archivée
  if (matchedPerformance && matchedPerformance.archived) {
      return true; // Performance déjà archivée
  } else {
      return false; // Performance non archivée
  }
}


  
}
