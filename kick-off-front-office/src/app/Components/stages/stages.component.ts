import { Component, OnInit } from '@angular/core';
import { TrainingPlan } from 'src/app/models/trainingPlan';
import { ActivatedRoute, Router } from '@angular/router';
import { Match } from 'src/app/models/match';
import { TrainingCalendarService } from 'src/app/services/services/training-calendar.service';
import { AuthService } from 'src/app/Services/auth/auth.service';

@Component({
  selector: 'app-stages',
  templateUrl: './stages.component.html',
  styleUrls: ['./stages.component.css']
})
export class StagesComponent {
  matches: Match[] = [];
  filteredMatches: Match[] = [];
  searchTrainingPlace: string = ''; // Attribut pour la recherche par lieu
  currentPage: number = 1;
  itemsPerPage: number = 7;
  order: 'asc' | 'desc' = 'asc';
  userDetails: any;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private trainingCalendarService: TrainingCalendarService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.getMatches();
    this.fetchUserDetails();
  }

  filterMatches(): void {
    if (this.searchTrainingPlace) {
      this.filteredMatches = this.matches.filter(match =>
        match.lieu.toLowerCase().includes(this.searchTrainingPlace.toLowerCase())
      );
    } else {
      this.filteredMatches = [...this.matches];
    }
    this.sortStagesByDate(this.order, this.filteredMatches); // Passer l'ordre et les stages filtrés pour le tri
  }
  fetchUserDetails(): void {
    this.authService.getUserDetails().subscribe(
      (response) => {
        this.userDetails = response;
      },
      (error) => {
        console.error('Error fetching user details:', error);
      }
    );
  }

  sortStagesByDate(order: 'asc' | 'desc', array: any[]): any[] {
    const sortedArray = [...array]; // Créer une copie du tableau pour éviter de modifier l'original

    if (order === 'asc') {
      sortedArray.sort((a, b) => {
        return new Date(a.startDate).getTime() - new Date(b.startDate).getTime();
      });
    } else {
      sortedArray.sort((a, b) => {
        return new Date(b.startDate).getTime() - new Date(a.startDate).getTime();
      });
    }

    return sortedArray;
  }

  search(): void {
    this.filterMatches(); // Appeler la fonction de filtrage lorsque la recherche est effectuée
  }

  getMatches(): void {
    this.trainingCalendarService.getAllMatches()
      .subscribe(
        matches => {
          this.matches = matches; // Stocker les matchs récupérés dans la variable du composant
          this.filterMatches(); // Appliquer les filtres initiaux une fois que les matchs sont récupérés
        },
        error => {
          console.error('Erreur lors du chargement des matchs :', error);
        }
      );
  }

  deletecalander(trainingId: string): void {
    this.trainingCalendarService.deleteMatch(trainingId)
      .subscribe(
        () => {
          console.log(' deleted successfully');
          this.getMatches();
        },
        (error) => {
          console.error('Error deleting :', error);
        }
      );
  }



  formaterDate(date: Date): string {
    return new Date(date).toLocaleDateString(); // Par exemple, "07/03/2024" pour le format "MM/JJ/AAAA"
  }

}




