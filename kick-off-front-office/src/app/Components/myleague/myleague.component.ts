import { Component, OnInit } from '@angular/core';
import { MyLeague } from '../../models/myLeague';
import { MyleagueService } from '../../Services/myleague.service';
import { CalendarOptions } from '@fullcalendar/core';




@Component({
  selector: 'app-myleague',
  templateUrl: './myleague.component.html',
  styleUrls: ['./myleague.component.css']
})
export class MyleagueComponent implements OnInit {
  myLeagues: MyLeague[] = [];
  filteredLeagues: MyLeague[] = []; // Filtered leagues based on match status
  


  constructor(private myLeagueService: MyleagueService) { }

  ngOnInit(): void {
    this.getAllMyLeagues();
  }

  getAllMyLeagues(): void {
    this.myLeagueService.getAll().subscribe(
      myLeagues => {
        this.myLeagues = myLeagues;
        this.filterByMatchStatus('scheduled'); // Set default to show scheduled matches

        console.log(myLeagues); // Optional: Log the retrieved data
      },
      error => {
        console.error('Error retrieving MyLeagues:', error);
        // Handle error as needed
      }
    );
  }

  filterByMatchStatus(status: string | null): void {
    if (status === null) {
        this.filteredLeagues = [...this.myLeagues]; // Show all leagues
    } else if (status === 'scheduled' || status === 'canceled' || status === 'completed') {
        this.filteredLeagues = this.myLeagues.filter(league => league.matchStatus === status);
    } else {
        this.filteredLeagues = [...this.myLeagues]; // If invalid status, show all leagues
    }
}
}

