import { Component } from '@angular/core';
import { Player } from '../../models/playerscouted';
import { ActivatedRoute, Router } from '@angular/router';
import { PlayerscoutedService } from '../../Services/playerscouted.service';

@Component({
  selector: 'app-modifyscoutplayer',
  templateUrl: './modifyscoutplayer.component.html',
  styleUrls: ['./modifyscoutplayer.component.css']
})
export class ModifyscoutplayerComponent {
  analysisId!: string;
  analysisDetails: Player = new Player();
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
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private analysisService: PlayerscoutedService// Importez votre service d'analyse de match
  ) { }


  ngOnInit(): void {
    this.analysisId = this.route.snapshot.params['id']; // Récupère l'ID de l'analyse de match depuis l'URL

    // Charge les détails de l'analyse de match en utilisant le service
    this.analysisService.getById(this.analysisId).subscribe(
      (data) => {
        this.analysisDetails = data;
      },
      (error) => {
        console.log("Error fetching analysis details:", error);
        // Gérer les erreurs
      }
    );
  }
  updateAnalysis() {
    // Mettre à jour les détails de l'analyse de match en utilisant le service
    this.analysisService.update(this.analysisId, this.analysisDetails).subscribe(
      (data) => {
        console.log("Analysis updated successfully!");
        // Rediriger vers la page de détails de l'analyse de match mise à jour
        this.router.navigate(['/scoutdetails', this.analysisId]);
      },
      (error) => {
        console.log("Error updating analysis:", error);
        // Gérer les erreurs
      }
    );
  }
  
}
