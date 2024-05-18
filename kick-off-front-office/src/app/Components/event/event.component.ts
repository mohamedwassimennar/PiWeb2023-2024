import { Component } from '@angular/core';
import { EventsService } from 'src/app/services/services/events.service';
import { Reser } from 'src/app/models/event';
import { AuthService } from 'src/app/Services/auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent {
  evenements: Reser[] = [];
  nouveau: Reser = new Reser();
  currentPage: number = 1;
  itemsPerPage: number = 6;
  order: 'asc' | 'desc' = 'asc';
  filteredEvenements: Reser[] = [];
  userDetails: any;
  constructor(private eventsService: EventsService, private authService: AuthService, private route: ActivatedRoute,
    private router: Router,) { }

  ngOnInit(): void {
    this.loadEvents();
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

  sortByDate(array: Reser[]): Reser[] {
    const sortedArray = [...array]; // Créer une copie du tableau pour éviter de modifier l'original

    if (this.order === 'asc') {
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






  loadEvents(): void {
    this.eventsService.getAllEvents().subscribe(
      (data: Reser[]) => {
        this.evenements = data;
        this.filteredEvenements = [...this.evenements];
      },
      (error) => {
        console.error('Erreur lors du chargement des événements :', error);
      }
    );
  }
  ajouter(): void {
    this.eventsService.createEvent(this.nouveau).subscribe(
      (data) => {
        console.log('Événement ajouté avec succès :', data);
        this.nouveau = new Reser();
        this.loadEvents();
        this.router.navigate(['/home']);
      },
      (error) => {
        console.error('Erreur lors de l\'ajout de l\'événement :', error);
      }
    );
  }
  formaterDate(date: Date): string {
    return new Date(date).toLocaleDateString(); // Par exemple, "07/03/2024" pour le format "MM/JJ/AAAA"
  }
}


