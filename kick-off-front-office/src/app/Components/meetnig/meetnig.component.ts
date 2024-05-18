import { Component, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth/auth.service';
import { Meet } from 'src/app/models/meet';
import { EventsService } from 'src/app/services/services/events.service';

@Component({
  selector: 'app-meetnig',
  templateUrl: './meetnig.component.html',
  styleUrls: ['./meetnig.component.css']
})
export class MeetnigComponent {
  evenement: Meet[] = [];
  nouveau: Meet = new Meet();
  currentPage: number = 1;
  itemsPerPage: number = 9;
  meetId!: string;
  Id!: string;
  userDetails: any;

  Details: Meet = new Meet();
  constructor(private eventsService: EventsService, private route: ActivatedRoute, private authService: AuthService,
    private router: Router,) { }

  ngOnInit(): void {
    this.getMatches();
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




  openUpdateModal(meetingId: string) {
    this.eventsService.getmeetById(meetingId).subscribe(
      (data) => {
        this.Details = data;
        // Ouvrir la modale ici si nécessaire
      },
      (error) => {
        console.log('Error fetching meeting details:', error);
      }
    );
  }
  update() {
    this.eventsService.updatemeet(this.Id, this.Details).subscribe(
      (data) => {
        console.log('Analysis updated successfully!');
      },
      (error) => {
        console.log('Error updating :', error);
      }
    );
  }


  getMatches() {
    this.eventsService.getAllMeets()
      .subscribe(
        evenement => {
          this.evenement = evenement;

        },
        error => {
          console.error('Erreur lors du chargement meet :', error);
        }
      );
  }

  ajouter(): void {
    console.log('Tentative d\'ajout de réunion avec les données suivantes :', this.nouveau);
    this.eventsService.createMeet(this.nouveau).subscribe(
      (data) => {
        console.log('Réunion ajoutée avec succès :', data);
        this.nouveau = new Meet();
        this.getMatches();
      },
      (error) => {
        console.error('Erreur lors de l\'ajout de réunion :', error);
      }
    );
  }
  formaterDate(date: Date): string {
    return new Date(date).toLocaleDateString(); // Par exemple, "07/03/2024" pour le format "MM/JJ/AAAA"
  }
  delete(meetId: string): void {
    this.eventsService.deleteMeet(meetId)
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

}
