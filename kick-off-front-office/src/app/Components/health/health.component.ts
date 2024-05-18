import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { Injury } from 'src/app/models/injury.model';
import { InjuryService } from 'src/app/Services/injury.service';
import { RecoveryPlan } from 'src/app/models/recoveryPlan.model';
import { RecoveryPlanService } from 'src/app/Services/recoveryPlan.service';
import { Prevention } from 'src/app/models/prevention.model';
import { PreventionService } from 'src/app/Services/prevention.service';

@Component({
  selector: 'app-health',
  templateUrl: './health.component.html',
  styleUrls: ['./health.component.css']
})
export class HealthComponent implements OnInit, AfterViewInit {
  @ViewChild('injuryChart') injuryChartRef!: ElementRef;
  @ViewChild('preventionChart') preventionChartRef!: ElementRef;
  injuries: Injury[] = [];
  totalInjuries: number = 0;
  injuryTypes: { [key: string]: number } = {};
  averageRecoveryTime: number = 0;
  chart: Chart | undefined;
  recoveryPlans: RecoveryPlan[] = [];
  preventions: Prevention[] = [];
  averageRecoveryDuration: number = 0;

  constructor(
    private injuryService: InjuryService,
    private recoveryPlanService: RecoveryPlanService,
    private preventionService: PreventionService
  ) {
    Chart.register(...registerables);
  }

  ngOnInit(): void {
    this.fetchInjuries();
    this.fetchRecoveryPlans();
    this.fetchPreventions();
  }

  ngAfterViewInit(): void {
    this.generateChart();
    this.generatePreventionChart(); // Call the prevention chart generation here as well
  }
  
  fetchInjuries(): void {
    this.injuryService.getAllInjuries()
        .subscribe(injuries => {
            // Filtrer les blessures non archivées
            this.injuries = injuries.filter(injury => !injury.archived);
            this.calculateStatistics();
            this.generateChart();
        });
}

  calculateStatistics(): void {
    this.totalInjuries = this.injuries.length;
    this.injuryTypes = this.countInjuryTypes();
    this.averageRecoveryTime = this.calculateAverageRecoveryTime();
  }

  countInjuryTypes(): { [key: string]: number } {
    const typesCount: { [key: string]: number } = {};
    this.injuries.forEach(injury => {
      typesCount[injury.type] = (typesCount[injury.type] || 0) + 1;
    });
    return typesCount;
  }

  calculateAverageRecoveryTime(): number {
    const totalRecoveryTime = this.injuries.reduce((total, injury) => total + injury.estimatedRecoveryTime, 0);
    return totalRecoveryTime / this.totalInjuries;
  }

  generateChart(): void {
    if (this.injuryChartRef && this.injuries.length > 0) {
      if (this.chart) {
        this.chart.destroy();
      }
      const ctx = this.injuryChartRef.nativeElement.getContext('2d');
      this.chart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: Object.keys(this.injuryTypes),
          datasets: [{
            label: 'Number of Injuries',
            data: Object.values(this.injuryTypes),
            backgroundColor: [
              '#cd0505', // Red color
              '#19204e', // Dark blue color
              '#255479', // Light blue color
              '#4082c4'  // Blue color
            ]
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          },
          plugins: {
            legend: {
              display: false // Hide the legend
            }
          }
        }
      });
    }
  }
  

  fetchRecoveryPlans(): void {
    this.recoveryPlanService.getAllRecoveryPlans()
        .subscribe(recoveryPlans => {
            // Filtrer les plans de récupération non archivés
            this.recoveryPlans = recoveryPlans.filter(plan => !plan.archived);
            this.calculateAverageRecoveryDuration();
        });
}

  calculateAverageRecoveryDuration(): void {
    const totalDuration = this.recoveryPlans.reduce((total, recoveryPlan) => {
      const startDate = new Date(recoveryPlan.recoveryStartDate);
      const endDate = new Date(recoveryPlan.recoveryEndDate);
      const durationInDays = (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24); // Convert milliseconds to days
      return total + durationInDays;
    }, 0);
    this.averageRecoveryDuration = totalDuration / this.recoveryPlans.length;
  }

  fetchPreventions(): void {
    this.preventionService.getAllPreventions()
        .subscribe(preventions => {
            // Filtrer les préventions non archivées
            this.preventions = preventions.filter(prevention => !prevention.archived);
            this.generatePreventionChart();
        });
}

  generatePreventionChart(): void {
    if (this.preventions.length > 0) {
      if (this.preventionChartRef) {
        const ctx = this.preventionChartRef.nativeElement.getContext('2d');
        const recommendedPracticesCount = this.countRecommendedPractices();
        const equipmentRecommendationsCount = this.countEquipmentRecommendations();
        const nutritionalRecommendationsCount = this.countNutritionalRecommendations();
        const lifestyleRecommendationsCount = this.countLifestyleRecommendations();

        new Chart(ctx, {
          type: 'pie', // Change to 'pie' for pie chart
          data: {
            labels: ['Recommended Practices', 'Equipment Recommendations', 'Nutritional Recommendations', 'Lifestyle Recommendations'],
            datasets: [{
              label: 'Number of Recommendations',
              data: [recommendedPracticesCount, equipmentRecommendationsCount, nutritionalRecommendationsCount, lifestyleRecommendationsCount],
              backgroundColor: [
                '#cd0505', // Red color
                '#19204e', // Dark blue color
                '#255479', // Light blue color
                '#4082c4'  // Blue color
              ]
            }]
          },
          options: {
            scales: {
              y: {
                beginAtZero: true
              }
            }
          }
        });
      }
    }
  }

  countRecommendedPractices(): number {
    return this.preventions.filter(prevention => prevention.recommendedPractices !== 'Not recommended').length;
  }

  countEquipmentRecommendations(): number {
    return this.preventions.filter(prevention => prevention.equipmentRecommendations !== 'Not recommended').length;
  }

  countNutritionalRecommendations(): number {
    return this.preventions.filter(prevention => prevention.nutritionalRecommendations !== 'Not recommended').length;
  }

  countLifestyleRecommendations(): number {
    return this.preventions.filter(prevention => prevention.lifestyleRecommendations !== 'Not recommended').length;
  }
}
