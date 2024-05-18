import { Component, OnInit } from '@angular/core';
import { PlayerscoutedService } from '../../Services/playerscouted.service';

@Component({
  selector: 'app-match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.css']
})
export class MatchComponent implements OnInit {
  matches: any[] = [];
  searchTerm: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 15;

  constructor(private matchService: PlayerscoutedService) { }

  ngOnInit(): void {
    this.matchService.getMatches().subscribe(
      (data: any[]) => {
        this.matches = data;
      },
      (error) => {
        console.error('Error fetching matches:', error);
        // Handle error
      }
    );
  }

  get filteredMatches(): any[] {
    return this.matches.filter(match => 
      match.homeTeam.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      match.awayTeam.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
}
