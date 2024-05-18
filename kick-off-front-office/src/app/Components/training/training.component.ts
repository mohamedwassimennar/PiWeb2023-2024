import { Component, OnInit } from '@angular/core';
import { TrainingPlan } from 'src/app/models/trainingPlan';
import { TrainingService } from 'src/app/services/tarining.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TrainingCalendarService } from 'src/app/services/services/training-calendar.service';
import { Match } from 'src/app/models/match';
import { UserService } from 'src/app/Services/user/user.service';
import { User } from 'src/app/models/User.Model';
import { AuthService } from 'src/app/Services/auth/auth.service';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',

  styleUrls: ['./training.component.css']
})
export class TrainingComponent implements OnInit {
  trainingPlans: TrainingPlan[] = [];
  trainingId!: string;
  matches: Match[] = [];
  dateFilter: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 6;
  searchTrainingType: string = '';
  filteredTrainingPlans: TrainingPlan[] = [];
  order: 'asc' | 'desc' = 'asc';
  userDetails: any;


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private trainingService: TrainingService,
    private TrainingCalendarService: TrainingCalendarService,
    private userService: UserService,
    private authService: AuthService

  ) {
  }

  ngOnInit() {
    this.getTrainingPlans();
    this.trainingId = this.route.snapshot.params['id'];
    this.getMatches();
    this.filterTrainingPlans();
    this.fetchUserDetails();


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




  sortByDate(order: 'asc' | 'desc', array: TrainingPlan[]): TrainingPlan[] {
    const sortedArray = [...array]; // Créer une copie du tableau pour éviter de modifier l'original

    if (order === 'asc') {
      sortedArray.sort((a, b) => {
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      });
    } else {
      sortedArray.sort((a, b) => {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      });
    }

    return sortedArray;
  }



  filterTrainingPlans(): void {
    if (this.searchTrainingType) {
      this.filteredTrainingPlans = this.trainingPlans.filter(plan =>
        plan.trainingType.toLowerCase().includes(this.searchTrainingType.toLowerCase())
      );
    } else {
      this.filteredTrainingPlans = [...this.trainingPlans];
    }
  }
  search(): void {
    this.filterTrainingPlans(); // Appeler la fonction de filtrage lorsque la recherche est effectuée
  }
  getMatches() {
    this.TrainingCalendarService.getAllMatches()
      .subscribe(
        matches => {
          this.matches = matches; // Stocker les matchs récupérés dans la variable du composant
        },
        error => {
          console.error('Erreur lors du chargement des matchs :', error);
        }
      );
  }


  getTrainingPlans() {
    this.trainingService.getAllTrainingPlans()
      .subscribe(
        plans => {
          this.trainingPlans = plans;
        },
        error => {
          console.error('Error loading plans', error);
        }
      );
  }
  deleteplan(trainingId: string): void {
    this.trainingService.deleteTrainingPlan(trainingId)
      .subscribe(
        () => {
          console.log(' deleted successfully');
          this.getTrainingPlans();
        },
        (error) => {
          console.error('Error deleting :', error);
        }
      );
  }
  deletecalander(trainingId: string): void {
    this.TrainingCalendarService.deleteMatch(trainingId)
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

