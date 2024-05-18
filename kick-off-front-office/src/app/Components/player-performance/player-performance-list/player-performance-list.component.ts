import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PlayerPerformance } from 'src/app/models/PlayerPerformance';
import { AuthService } from 'src/app/Services/auth/auth.service';
import { PlayerPerformanceService } from 'src/app/Services/player-performance.service';

@Component({
  selector: 'app-player-performance-list',
  templateUrl: './player-performance-list.component.html',
  styleUrls: ['./player-performance-list.component.css']
})
export class PlayerPerformanceListComponent {

  playerPerformances: PlayerPerformance[] = [];
  deleteSuccessMessage:string='';
  userDetails: any; // Pour stocker les détails de l'utilisateur connecté



  constructor(private playerPerformanceService: PlayerPerformanceService,private router: Router,private authService: AuthService) { }


  ngOnInit(): void {
    this.loadPlayerPerformances();
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
  loadPlayerPerformances(): void {
    this.playerPerformanceService.getPlayerPerformances().subscribe(
      playerPerformances => {
        // Filtrer les performances archivées
        this.playerPerformances = playerPerformances.filter(performance => !performance.archived);
      },
      error => {
        console.error('Error fetching player performances:', error);
      }
    );
  }
  navigateToAddPerformance(): void {
    this.router.navigateByUrl('/PerfermancePlayer/perfermance-create');
  }
  navigateToPerformanceDetails(id: string): void {
    this.router.navigateByUrl(`/PerfermancePlayer/performance-details/${id}`);
  }
  deletePerformance(id: string): void {
    if (confirm('Are you sure you want to delete this performance?')) {

      this.playerPerformanceService.deletePerformance(id)
        .subscribe(() => {
          this.loadPlayerPerformances();
          this.deleteSuccessMessage = 'Performance deleted successfully!';

        });
    }
  }
  clearDeleteSuccessMessage(): void {
    this.deleteSuccessMessage = '';
  }
  navigateToUpdatePerformance(id: string) {
    this.router.navigate(['/PerfermancePlayer/update-performance', id]);
  }

  archivePerformance(id: string): void {
    if (confirm('Êtes-vous sûr de vouloir archiver cette performance ?')) {
        this.playerPerformanceService.archivePerformance(id).subscribe(
            () => {
                // Recharge la liste des performances après l'archivage
                this.loadPlayerPerformances();
                // Affiche un message de succès
                this.deleteSuccessMessage = "Performance archivée avec succès!";
            },
            (error) => {
                console.log(error);
                // Gérer les erreurs
            }
        );
    }
  }
  
}