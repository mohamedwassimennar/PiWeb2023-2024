import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Match } from 'src/app/models/match';
import { TrainingCalendarService } from 'src/app/services/services/training-calendar.service';

@Component({
  selector: 'app-add-calendar',
  templateUrl: './add-calendar.component.html',
  styleUrls: ['./add-calendar.component.css']
})
export class AddCalendarComponent {
  nouveauMatch: Match = new Match();

  programmeEntrainement!: string;;

  onFileSelected(event: any) {
    this.programmeEntrainement = event.target.files[0];
  }

  constructor(private router: Router, private trainingService: TrainingCalendarService) { }

  ajouter() {
    this.trainingService.createMatch(this.nouveauMatch).subscribe(
      (data) => {
        console.log("Match ajouté avec succès !");
        this.router.navigate(['/internships']);
      },
      (error) => {
        console.log("Erreur lors de l'ajout du match :", error);
      }
    );
  }
}

