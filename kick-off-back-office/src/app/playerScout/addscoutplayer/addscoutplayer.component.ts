import { Component } from '@angular/core';
import { Player } from '../../models/playerscouted';
import { ActivatedRoute, Router } from '@angular/router';
import { PlayerscoutedService } from '../../Services/playerscouted.service';

@Component({
  selector: 'app-addscoutplayer',
  templateUrl: './addscoutplayer.component.html',
  styleUrls: ['./addscoutplayer.component.css']
})
export class AddscoutplayerComponent {
  newAnalysis: Player= new Player();
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

  constructor(private router: Router, private matchAnalysisService: PlayerscoutedService) { }
  addAnalysis() {
    this.matchAnalysisService.create(this.newAnalysis).subscribe(
      (data) => {
        console.log("New analysis added successfully!");
        //this.router.navigate(['/match-analyses']); // Rediriger vers la liste des analyses après l'ajout
        this.router.navigate(['/scout']);

      },
      (error) => {
        console.log("Error adding new analysis:", error);
      }
    );
  }

  

 
}