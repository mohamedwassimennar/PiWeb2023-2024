import { Component, OnInit } from '@angular/core';
import { PlayerscoutedService } from '../../Services/playerscouted.service';
import { Player } from '../../models/playerscouted';
import { Router } from '@angular/router';

@Component({
  selector: 'app-archievedplayers',
  templateUrl: './archievedplayers.component.html',
  styleUrls: ['./archievedplayers.component.css']
})
export class ArchievedplayersComponent implements OnInit {
  players: Player[] = [];
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

  constructor(private playerService: PlayerscoutedService, private router: Router) { }

  ngOnInit(): void {
    this.loadMatchAnalyses();

  }

  loadMatchAnalyses(): void {
  this.playerService.getAll()
    .subscribe(
      players => {
        console.log('Players:', players); // Log the received players
        this.players = players;
      },
      error => {
        console.error('Error fetching match analyses:', error);
      }
    );
}

 
}
