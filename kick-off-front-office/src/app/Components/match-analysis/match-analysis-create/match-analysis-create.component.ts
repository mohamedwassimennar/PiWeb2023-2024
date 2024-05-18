import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatchAnalysis } from 'src/app/models/Match Analysis';
import { MatchAnalysisService } from 'src/app/Services/match-analysis.service';

@Component({
  selector: 'app-match-analysis-create',
  templateUrl: './match-analysis-create.component.html',
  styleUrls: ['./match-analysis-create.component.css']
})
export class MatchAnalysisCreateComponent {
  analysisForm!: FormGroup;
  successMessage: string = '';


  newAnalysis: MatchAnalysis= new MatchAnalysis();

  constructor(private router: Router, private matchAnalysisService: MatchAnalysisService,
    private formBuilder: FormBuilder,
    ) { }


    ngOnInit(): void {
      this.analysisForm = this.formBuilder.group({
        teamPerformance: ['',Validators.required],
        tacticalFormations: ['',Validators.required],
        keyMoments: ['',Validators.required]
      });
    }
    /*
  
  addAnalysis() {
    this.matchAnalysisService.create(this.newAnalysis).subscribe(
      (data) => {
        console.log("New analysis added successfully!");
        //this.router.navigate(['/match-analyses']); 
      },
      (error) => {
        console.log("Error adding new analysis:", error);
      }
    );
  }
  */
  addAnalysis() {
    if (this.analysisForm.valid) {
      this.matchAnalysisService.create(this.analysisForm.value).subscribe(
        (data) => {
          this.successMessage = 'New analysis added successfully!';
          setTimeout(() => {
            this.successMessage = '';
          }, 3000); 
          console.log("New analysis added successfully!");
          // this.router.navigate(['/match-analyses']); 
        },
        (error) => {
          console.log("Error adding new analysis:", error);
        }
      );
    } else {
      // Afficher des messages d'erreur ou effectuer une action appropriée
      console.log("Form is invalid");
    }
  }

  goBack() {
    this.router.navigate(['/MatchAnalysise/analyses-match']); 
  }
 
}
