import { Component, OnInit } from '@angular/core';
import { MyLeague } from '../../models/MyLeague';
import { MyleagueService } from '../../Services/myleague.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-myleaguelist',
  templateUrl: './myleaguelist.component.html',
  styleUrls: ['./myleaguelist.component.css']
})
export class MyleaguelistComponent implements OnInit {
  myLeagues: MyLeague[] = [];
  filteredLeagues: MyLeague[] = []; 
  currentPage: number = 1; 
  itemsPerPage: number = 9; 
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
  

  constructor(private myLeagueService: MyleagueService, private router: Router) { }

  ngOnInit(): void {
    this.getAllMyLeagues();
    this.filterByMatchStatus(null); // Show all leagues by default

  }

  getAllMyLeagues(): void {
    this.myLeagueService.getAll().subscribe(
      myLeagues => {
        this.myLeagues = myLeagues;
        this.filterByMatchStatus(null); // Set default to show scheduled matches

        console.log(myLeagues); // Optional: Log the retrieved data
      },
      error => {
        console.error('Error retrieving MyLeagues:', error);
        // Handle error as needed
      }
    );
  }

  navigateToUpdate(id: string) {
    this.router.navigate(['/modifyleague', id]);
  }

  navigateToAdd() {
    this.router.navigate(['/addleague']);
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
onFileSelected(event: any): void {
  const file: File = event.target.files[0];
  if (file) {
    this.uploadFile(file);
  }
}

uploadFile(file: File): void {
  const formData: FormData = new FormData();
  formData.append('csvFile', file, file.name);
  this.myLeagueService.uploadCSV(formData).subscribe(
    response => {
      console.log('CSV uploaded successfully:', response);
      // Refresh the data after successful upload
      this.getAllMyLeagues();
    },
    error => {
      console.error('Error uploading CSV:', error);
      // Handle error as needed
    }
  );
}
deleteAnalysis(id: string) {
  if (confirm('Êtes-vous sûr de vouloir supprimer cette analyse de match ?')) {
    this.myLeagueService.delete(id).subscribe(
      () => {
        // Recharge la liste des analyses après la suppression
        this.getAllMyLeagues();
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
archivePlayer(id: string) {
  if (confirm('Are you sure you want to archive this player?')) {
    this.myLeagueService.archivePlayer(id).subscribe(
      () => {
        // Reload the list of players after archiving
        this.getAllMyLeagues();
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
navigateToArchive() {
  this.router.navigate(['/archive2']);
}

}

