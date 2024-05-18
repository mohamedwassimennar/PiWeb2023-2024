import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PerformanceSummary } from 'src/app/models/Performance Summary';
import { PerformanceSummaryService } from 'src/app/Services/performance-summary.service';

@Component({
  selector: 'app-performance-summary-details',
  templateUrl: './performance-summary-details.component.html',
  styleUrls: ['./performance-summary-details.component.css']
})
export class PerformanceSummaryDetailsComponent implements OnInit {
  performanceId!: string;
  performance!: PerformanceSummary;

  constructor(
    private route: ActivatedRoute,
    private performanceService: PerformanceSummaryService,
    private router: Router
  ) { }
  ngOnInit(): void {
    this.performanceId = this.route.snapshot.params['id']; // Récupère l'ID de la performance depuis l'URL
    this.loadPerformanceDetails();
  }

  loadPerformanceDetails(): void {
    this.performanceService.getById(this.performanceId).subscribe(
      (data) => {
        this.performance = data;
      },
      (error) => {
        console.error('Error fetching performance details:', error);
        // Gérer les erreurs
      }
    );
  }
  goBack() {
    this.router.navigate(['/perfermance-summary/perfermance-summary-list']);
  }
  
}
