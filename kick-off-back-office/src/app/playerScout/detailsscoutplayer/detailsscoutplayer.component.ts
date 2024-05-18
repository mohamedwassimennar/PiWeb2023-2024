import { Component, OnInit } from '@angular/core';
import { Player } from '../../models/playerscouted';
import { ActivatedRoute, Router } from '@angular/router';
import { PlayerscoutedService } from '../../Services/playerscouted.service';




@Component({
  selector: 'app-detailsscoutplayer',
  templateUrl: './detailsscoutplayer.component.html',
  styleUrls: ['./detailsscoutplayer.component.css']
})
export class DetailsscoutplayerComponent implements OnInit {
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

  analysisId!: string;
  analysisDetails!: Player;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private analysisService: PlayerscoutedService
  ) { }
  ngOnInit(): void {
    this.analysisId = this.route.snapshot.params['id'];

    this.analysisService.getById(this.analysisId).subscribe(
      (data: Player) => {
        this.analysisDetails = data;
      },
      (error) => {
        console.log("Error fetching analysis details:", error);
      }
    );
  }

  navigateToList() {
    this.router.navigate(['/scout']);
  }
}
