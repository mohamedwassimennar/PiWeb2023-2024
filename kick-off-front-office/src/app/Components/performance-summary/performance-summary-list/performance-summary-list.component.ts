import { Component, OnInit } from '@angular/core';
import { PerformanceSummary } from 'src/app/models/Performance Summary';
import { AuthService } from 'src/app/Services/auth/auth.service';
import { PerformanceSummaryService } from 'src/app/Services/performance-summary.service';

@Component({
  selector: 'app-performance-summary-list',
  templateUrl: './performance-summary-list.component.html',
  styleUrls: ['./performance-summary-list.component.css']
})
export class PerformanceSummaryListComponent implements OnInit {
  performances: PerformanceSummary[] = [];
  deleteSuccessMessage:string='';
  userDetails: any; // Pour stocker les détails de l'utilisateur connecté



  constructor(private performanceService: PerformanceSummaryService,private authService: AuthService) { }
  ngOnInit(): void {
    this.loadPerformances();
    this.fetchUserDetails(); 

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

  deletePerformance(id: string): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette performance ?')) {
      this.performanceService.delete(id).subscribe(
        () => {
          // Recharge la liste des performances après la suppression
          this.loadPerformances();
          this.deleteSuccessMessage = 'Performance summury deleted successfully!';

        },
        (error) => {
          console.log(error);
          // Gérer les erreurs
        }
      );
    }
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