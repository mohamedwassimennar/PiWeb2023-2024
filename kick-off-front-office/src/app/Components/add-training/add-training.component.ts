import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { TrainingPlan } from 'src/app/models/trainingPlan';
import { TrainingService } from 'src/app/services/tarining.service';

@Component({
  selector: 'app-add-training',
  templateUrl: 'add-training.component.html',
  styleUrls: ['./add-training.component.css']
})
export class AddTrainingComponent {
  nouvelleAnalyse: TrainingPlan = new TrainingPlan();

  constructor(private router: Router, private trainingService: TrainingService) { }

  ajouter() {
    this.trainingService.createTrainingPlan(this.nouvelleAnalyse).subscribe(
      (data) => {
        console.log(" ajoutée avec succès !");
        this.router.navigate(['/Training']);
      },
      (error) => {
        console.log("Erreur lors de l'ajout  :", error);
      }
    );
  }

}

