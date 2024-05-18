import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TrainingPlan } from 'src/app/models/trainingPlan';
import { TrainingService } from 'src/app/services/tarining.service';
@Component({
  selector: 'app-update-training',
  templateUrl: './update-training.component.html',
  styleUrls: ['./update-training.component.css']
})
export class UpdateTrainingComponent {
  analysisId!: string;
  analysisDetails: TrainingPlan = new TrainingPlan();
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private trainingService: TrainingService
  ) { }


  ngOnInit(): void {
    this.analysisId = this.route.snapshot.params['id'];

    this.trainingService.getTrainingPlanById(this.analysisId).subscribe(
      (data) => {
        this.analysisDetails = data;
      },
      (error) => {
        console.log("Error fetching analysis details:", error);
      }
    );
  }
  updateAnalysis() {
    this.trainingService.updateTrainingPlan(this.analysisId, this.analysisDetails).subscribe(
      (data) => {
        this.router.navigate(['/Training']);
      },
      (error) => {
        console.log("Error updating analysis:", error);
      }
    );
  }

}