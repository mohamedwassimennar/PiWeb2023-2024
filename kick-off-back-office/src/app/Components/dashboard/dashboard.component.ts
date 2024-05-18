
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Chart, { registerables } from 'chart.js/auto';
import { Injury } from '../../models/injuries';
import { Prevention } from '../../models/preventions';
import { RecoveryPlan } from '../../models/recoveries';
import { InjuriesService } from '../../Services/injuries.service';
import { PreventionsService } from '../../Services/preventions.service';
import { RecoveriesService } from '../../Services/recoveries.service';
import { AuthService } from 'src/app/Services/auth/auth.service';
import { MyLeague } from '../../models/MyLeague';
import { MyleagueService } from '../../Services/myleague.service';
import { TrainingService } from 'src/app/Services/training.service';
import { Meet } from 'src/app/models/training.model';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, AfterViewInit {
  backgroundImageSrc: string = '../../../assets/images/fooball.jpg'; // Update this with the path to your image
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
  matchStatusData: { status: string, count: number }[] = [];
  fixtureTypeData: { type: string, count: number }[] = [];

  chart3: Chart | undefined;
  chart2: Chart | undefined;
  meetTypeData: { type: string, count: number }[] = [];
  chart7: Chart | undefined;
  totalMeetings: number = 0;

  isSubMenuOpen: boolean = false;

  isUserSubMenuOpen: boolean = false;
  toggleUserSubMenu() {
    this.isUserSubMenuOpen = !this.isUserSubMenuOpen;
  }
  toggleSubMenu(): void {
    this.isSubMenuOpen = !this.isSubMenuOpen;

  }
  isPerformanceSubMenuOpen: boolean = false;

  togglePerformanceSubMenu() {
    this.isPerformanceSubMenuOpen = !this.isPerformanceSubMenuOpen;
  }

  constructor(
    private injuryService: InjuriesService,
    private recoveryPlanService: RecoveriesService,
    private preventionService: PreventionsService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private myLeagueService: MyleagueService,
    private meetService: TrainingService
  ) {
    Chart.register(...registerables);
  }

  token: string | null = null;

  ngOnInit(): void {
     // Extract token from URL query parameters
     this.token = this.route.snapshot.queryParamMap.get('token');
     if (this.token) {
       console.log('Token:', this.token);
       // Store the token securely in your admin project
       this.authService.setToken(this.token);
     } else {
       // Token not found, handle the case accordingly
       console.error('Token not found in URL');
     }
    this.fetchInjuries();
    this.fetchRecoveryPlans();
    this.fetchPreventions();
    this.fetchMatchData();
    this.fetchMeetData();

  }

  logout(): void {
    this.authService.performLogout().subscribe(
      () => {
        console.log('Logout successful');
        // Redirect the user to the login page after successful logout
        window.location.href = 'http://localhost:4200/user/login'; // Assuming the other project is running on port 4201
      },
      error => {
        console.error('Logout error:', error);
      }
    );
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
  fetchMatchData(): void {
    this.myLeagueService.getAll().subscribe((matches: MyLeague[]) => {
      const matchStatusCount = matches.reduce((acc: any, match: MyLeague) => {
        acc[match.matchStatus] = (acc[match.matchStatus] || 0) + 1;
        return acc;
      }, {});

      const fixtureTypeCount = matches.reduce((acc: any, match: MyLeague) => {
        acc[match.fixtureType] = (acc[match.fixtureType] || 0) + 1;
        return acc;
      }, {});

      this.fixtureTypeData = Object.keys(fixtureTypeCount).map((type: string) => ({
        type,
        count: fixtureTypeCount[type]
      }));

      this.matchStatusData = Object.keys(matchStatusCount).map((status: string) => ({
        status,
        count: matchStatusCount[status]
      }));

      this.generateChart3();
      this.generateChart2(); // Call generateChart2 as well
    });
  }

  generateChart3(): void {
    const canvas: any = document.getElementById('matchStatusChart');
    const ctx = canvas.getContext('2d');

    this.chart3 = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: this.matchStatusData.map(data => data.status),
        datasets: [{
          label: 'Match Status',
          data: this.matchStatusData.map(data => data.count),
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)'
          ],
          borderWidth: 1
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

  generateChart2(): void {
    const canvas: any = document.getElementById('fixtureTypeChart');
    const ctx = canvas.getContext('2d');

    this.chart2 = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: this.fixtureTypeData.map(data => data.type),
        datasets: [{
          label: 'Fixture Type',
          data: this.fixtureTypeData.map(data => data.count),
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)'
          ],
          borderWidth: 1
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
  fetchMeetData(): void {
    this.meetService.getAllMeets().subscribe((meets: Meet[]) => {
      const meetTypeCount = meets.reduce((acc: any, meet: Meet) => {
        acc[meet.meettype] = (acc[meet.meettype] || 0) + 1;
        return acc;
      }, {});

      this.meetTypeData = Object.keys(meetTypeCount).map((type: string) => ({
        type,
        count: meetTypeCount[type]
      }));

      // Calculer le nombre total de réunions
      this.totalMeetings = meets.length;

      this.generateChart7();
    });
  }

  generateChart7(): void {
    const canvas: any = document.getElementById('meetTypeChart');
    const ctx = canvas.getContext('2d');

    // Définir des couleurs spécifiques pour chaque type de réunion
    const backgroundColors = this.meetTypeData.map((data) => {
      switch (data.type) {
        case 'player':
          return 'rgba(54, 162, 235, 0.6)'; // Bleu pour les réunions de type joueur
        case 'doctor':
          return 'rgba(255, 99, 132, 0.6)'; // Rouge pour les réunions de type médecin
        default:
          return 'rgba(255, 206, 86, 0.6)'; // Jaune pour les autres types de réunions
      }
    });

    this.chart7 = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: this.meetTypeData.map(data => data.type),
        datasets: [{
          label: 'Type de réunion',
          data: this.meetTypeData.map(data => data.count),
          backgroundColor: backgroundColors,
          borderColor: backgroundColors, // Utiliser la même couleur pour les bordures
          borderWidth: 1
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

