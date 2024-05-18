import { Component, OnInit } from '@angular/core';
import { PlayerscoutedService } from '../../Services/playerscouted.service';

@Component({
  selector: 'app-matchesapi',
  templateUrl: './matchesapi.component.html',
  styleUrls: ['./matchesapi.component.css']
})
export class MatchesapiComponent implements OnInit {
  matchSchedules: any[] = [];
  matchSchedules2: any[] = [];
  selectedData: string = 'matchSchedules';
  filter: string = 'FINISHED';
  filteredMatchSchedules: any[] = [];
  filteredMatchSchedules2: any[] = [];
  currentPage: number = 1; 
  itemsPerPage: number = 9; 
  searchQuery: string = '';


  constructor(private matchScheduleService: PlayerscoutedService) { }

  ngOnInit(): void {
    this.loadMatchSchedules();
    this.loadMatchSchedules2();
  }

  loadMatchSchedules(): void {
    this.matchScheduleService.getMatchSchedules().subscribe(
      data => {
        this.matchSchedules = data;
        this.applyFilter();
      },
      error => {
        console.error('Error fetching match schedules:', error);
      }
    );
  }

  loadMatchSchedules2(): void {
    this.matchScheduleService.getMatchSchedules2().subscribe(
      data => {
        this.matchSchedules2 = data;
        this.applyFilter();
      },
      error => {
        console.error('Error fetching match schedules:', error);
      }
    );
  }

  setFilter(status: string): void {
    this.filter = status;
    this.applyFilter();
  }

  applyFilter(): void {
    if (this.selectedData === 'matchSchedules') {
      this.filteredMatchSchedules = this.matchSchedules.filter(match => match.status === this.filter);
    } else if (this.selectedData === 'matchSchedules2') {
      this.filteredMatchSchedules2 = this.matchSchedules2.filter(match => match.status === this.filter);
    }
  }

  search(): void {
    const searchQuery = this.searchQuery.toLowerCase();
    
    if (this.selectedData === 'matchSchedules') {
      this.filteredMatchSchedules = this.matchSchedules.filter(match =>
        match.homeTeam.name.toLowerCase().includes(searchQuery) ||
        match.awayTeam.name.toLowerCase().includes(searchQuery) ||
        (match.homeTeam.name.toLowerCase() + ' vs ' + match.awayTeam.name.toLowerCase()).includes(searchQuery)
      );
    } else if (this.selectedData === 'matchSchedules2') {
      this.filteredMatchSchedules2 = this.matchSchedules2.filter(match =>
        match.homeTeam.name.toLowerCase().includes(searchQuery) ||
        match.awayTeam.name.toLowerCase().includes(searchQuery) ||
        (match.homeTeam.name.toLowerCase() + ' vs ' + match.awayTeam.name.toLowerCase()).includes(searchQuery)
      );
    }
  }

 
  
}
