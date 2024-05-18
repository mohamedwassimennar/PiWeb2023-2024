import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { PlayerPerformanceService } from 'src/app/Services/player-performance.service';

@Component({
  selector: 'app-topplayer',
  templateUrl: './topplayer.component.html',
  styleUrls: ['./topplayer.component.css']
})
export class TopplayerComponent  implements OnInit {
  players: any[] = []; // Initialiser avec un tableau vide
  filteredPlayers: any[] = []; // Tableau pour stocker les joueurs filtrés
  minAge: number = 20; // Age minimum pour le filtre
  minGoals: number = 0; // Nombre minimum de buts marqués pour le filtre



  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getTopPlayers();
  }

  getTopPlayers(): void {
    this.http.get<any>('http://localhost:3000/apiExternePlayers')
      .subscribe(data => {
        this.players = data.players; // Assigner les données des joueurs
        this.filteredPlayers = this.players; // Initialiser les joueurs filtrés avec toutes les données
        this.filterPlayers(); // Appliquer le filtre initial
      });
  }


  filterPlayers(): void {
    this.filteredPlayers = this.players.filter(player => {
      return player.Age >= this.minAge && player.Goals >= this.minGoals;
    });
  }
}
