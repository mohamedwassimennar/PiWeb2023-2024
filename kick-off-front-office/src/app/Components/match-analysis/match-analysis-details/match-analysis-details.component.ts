import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatchAnalysis } from 'src/app/models/Match Analysis';
import { MatchAnalysisService } from 'src/app/Services/match-analysis.service';


@Component({
  selector: 'app-match-analysis-details',
  templateUrl: './match-analysis-details.component.html',
  styleUrls: ['./match-analysis-details.component.css']
})
export class MatchAnalysisDetailsComponent implements OnInit {

  analysisId!: string;
  analysisDetails!: MatchAnalysis;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private analysisService: MatchAnalysisService
  ) { }
  ngOnInit(): void {
    this.analysisId = this.route.snapshot.params['id'];

    this.analysisService.getById(this.analysisId).subscribe(
      (data: MatchAnalysis) => {
        this.analysisDetails = data;
      },
      (error) => {
        console.log("Error fetching analysis details:", error);
      }
    );
  }

  goBack(): void {
    this.router.navigate(['/MatchAnalysise/analyses-match']);
  }

  
}
