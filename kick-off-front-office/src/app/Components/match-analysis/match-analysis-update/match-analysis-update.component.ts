import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatchAnalysis } from 'src/app/models/Match Analysis';
import { MatchAnalysisService } from 'src/app/Services/match-analysis.service';

@Component({
  selector: 'app-match-analysis-update',
  templateUrl: './match-analysis-update.component.html',
  styleUrls: ['./match-analysis-update.component.css']
})
export class MatchAnalysisUpdateComponent {
  analysisId!: string;
  analysisDetails: MatchAnalysis = new MatchAnalysis();
  updateSuccess: boolean = false;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private analysisService: MatchAnalysisService
  ) { }


  ngOnInit(): void {
    this.analysisId = this.route.snapshot.params['id']; 

   
    this.analysisService.getById(this.analysisId).subscribe(
      (data) => {
        this.analysisDetails = data;
      },
      (error) => {
        console.log("Error fetching analysis details:", error);
      }
    );
  }
  updateAnalysis() {
 
    this.analysisService.update(this.analysisId, this.analysisDetails).subscribe(
      (data) => {
        console.log("Analysis updated successfully!");
        this.updateSuccess = true;
        setTimeout(() => {
          this.updateSuccess = false;
        }, 3000);
        
       // this.router.navigate(['/match-analysis-details', this.analysisId]);
      },
      (error) => {
        console.log("Error updating analysis:", error);
      }
    );
  }

  goBack() {
    this.router.navigate(['/MatchAnalysise/analyses-match']);
  }
}
