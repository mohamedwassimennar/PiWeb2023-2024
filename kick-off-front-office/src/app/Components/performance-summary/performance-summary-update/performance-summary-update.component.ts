import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PerformanceSummary } from 'src/app/models/Performance Summary';
import { PerformanceSummaryService } from 'src/app/Services/performance-summary.service';

@Component({
  selector: 'app-performance-summary-update',
  templateUrl: './performance-summary-update.component.html',
  styleUrls: ['./performance-summary-update.component.css']
})
export class PerformanceSummaryUpdateComponent implements OnInit {
  performanceId!: string;
  performanceDetails!: any;
  updateSuccess = false;

  constructor(
    private route: ActivatedRoute,
    private performanceService: PerformanceSummaryService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.performanceId = this.route.snapshot.params['id'];
    this.performanceService.getById(this.performanceId).subscribe(
      (data) => {
        this.performanceDetails = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  updatePerformance() {
    this.performanceService.update(this.performanceId, this.performanceDetails).subscribe(
      (data) => {
        console.log("Performance updated successfully!");
        this.updateSuccess = true;
        
        setTimeout(() => {
          this.updateSuccess = false; 
        }, 5000); 
      },
    
      (error) => {
        console.log(error);
      }
    );
  }

  goBack() {
    this.router.navigate(['/perfermance-summary/perfermance-summary-list']); 
  }
}
