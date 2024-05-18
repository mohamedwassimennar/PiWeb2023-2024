import { Component, OnInit } from '@angular/core';
import { PlayerscoutedService } from '../../../Services/playerscouted.service';
import { Player } from '../../../models/playerscouted';
import { Router } from '@angular/router';



@Component({
  selector: 'app-scoutplayerlist',
  templateUrl: './scoutplayerlist.component.html',
  styleUrls: ['./scoutplayerlist.component.css']
})
export class ScoutplayerlistComponent implements OnInit {
  players: Player[] = [];
  newsArticles: any[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 9;



  constructor(private playerService: PlayerscoutedService, private router: Router) { }

  ngOnInit(): void {
    this.loadMatchAnalyses();
    this.loadFootballNews();

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



  navigateToDetails(id: string) {
    this.router.navigate(['/scoutdetails', id]);
  }

  navigateToUpdate(id: string) {
    this.router.navigate(['/modifyscout', id]);
  }
  deleteAnalysis(id: string) {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette analyse de match ?')) {
      this.playerService.delete(id).subscribe(
        () => {
          // Recharge la liste des analyses après la suppression
          this.loadMatchAnalyses();
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }

  navigateToAdd() {
    this.router.navigate(['/addscout']);
  }

  loadFootballNews(): void {
    this.playerService.getFootballNews().subscribe(
      data => {
        //this.newsArticles = data.slice(0, 6);
        const shuffledArticles = this.shuffleArray(data);
        // Select the first 6 articles
        this.newsArticles = shuffledArticles.slice(0, 6);
      },
      error => {
        console.error('Error fetching football news:', error);
      }
    );
  }
  // Function to shuffle the array
  shuffleArray(array: any[]): any[] {
    let currentIndex = array.length, randomIndex;
    // While there remain elements to shuffle
    while (currentIndex !== 0) {
      // Pick a remaining element
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // Swap it with the current element
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }

    return array;
  }



}
