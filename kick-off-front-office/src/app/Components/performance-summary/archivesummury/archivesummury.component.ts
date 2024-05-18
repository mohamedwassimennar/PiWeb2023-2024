import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PerformanceSummary } from 'src/app/models/Performance Summary';
import { PerformanceSummaryService } from 'src/app/Services/performance-summary.service';


@Component({
  selector: 'app-archivesummury',
  templateUrl: './archivesummury.component.html',
  styleUrls: ['./archivesummury.component.css']
})
export class ArchivesummuryComponent {
  performances: PerformanceSummary[] = [];
  deleteSuccessMessage:string='';

  constructor(private performanceService: PerformanceSummaryService,private router :Router) { }

  ngOnInit(): void {
    this.loadPerformances();
  }

  loadPerformances(): void {
    this.performanceService.getAll()
      .subscribe(
        performances => {
          // Filtrer les performances archivées
          this.performances = performances.filter(performance => performance.archived);
        },
        error => {
          console.error('Erreur lors du chargement des performances archivées :', error);
        }
      );
  }

  clearDeleteSuccessMessage(): void {
    this.deleteSuccessMessage = '';
  }

  retourFunction() {
    this.router.navigate(['/perfermancesummary']);

  }
}
