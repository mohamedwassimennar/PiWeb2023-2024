import { AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { UserService } from 'src/app/Services/user/user.service';

@Component({
  selector: 'app-user-chart',
  templateUrl: './user-chart.component.html',
  styleUrls: ['./user-chart.component.css']
})
export class UserChartComponent implements AfterViewInit {
  roleCounts: { role: string, verifiedCount: number, unverifiedCount: number }[] = [];
  @ViewChildren('chartCanvas') chartCanvasList!: QueryList<ElementRef>;

  constructor(private userService: UserService) { }

  ngAfterViewInit(): void {
    this.fetchRoleCounts();
  }

  fetchRoleCounts() {
    // Fetch counts for each role
    const roles = ["coach", "player", "doctor", "technicalManager", "physiotherapist", "assistantCoach", "fitnessCoach"];
    roles.forEach(role => {
      let roleCount = { role: role, verifiedCount: 0, unverifiedCount: 0 };

      this.userService.countVerifiedUsersByRole(role).subscribe(
        response => {
          roleCount.verifiedCount = response.verifiedUsersCount;
          this.createPieChart(roleCount);
        },
        error => {
          console.error('Error fetching verified user count:', error);
        }
      );

      this.userService.countUnverifiedUsersByRole(role).subscribe(
        response => {
          roleCount.unverifiedCount = response.unverifiedUsersCount;
          this.createPieChart(roleCount);
        },
        error => {
          console.error('Error fetching unverified user count:', error);
        }
      );

      this.roleCounts.push(roleCount);
    });
  }

  createPieChart(roleCount: { role: string, verifiedCount: number, unverifiedCount: number }) {
    const canvasIndex = this.roleCounts.findIndex(item => item.role === roleCount.role);
    const canvasElement = this.chartCanvasList.toArray()[canvasIndex].nativeElement;
    let pieChart = canvasElement.chart;

    if (pieChart) {
      // Update existing chart data
      pieChart.data.labels = ['Verified', 'Unverified'];
      pieChart.data.datasets[0].data = [roleCount.verifiedCount, roleCount.unverifiedCount];
      pieChart.update();
    } else {
      const context = canvasElement.getContext('2d');
      pieChart = new Chart(context, {
        type: 'pie',
        data: {
          labels: ['Verified', 'Unverified'],
          datasets: [{
            label: `${roleCount.role} Users`,
            data: [roleCount.verifiedCount, roleCount.unverifiedCount],
            backgroundColor: ['#36a2eb', '#FF6384']
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false, // Add this line to prevent chart from maintaining aspect ratio
          aspectRatio: 1, // Set aspect ratio to 1 for a square chart
          plugins: {
            legend: {
              position: 'bottom'
            }
          },
          layout: {
            padding: {
              left: 10,
              right: 10,
              top: 10,
              bottom: 10
            }
          }
        }
      });

      canvasElement.chart = pieChart;
    }
  }
  getCardHeaderClass(role: string) {
    switch (role) {
      case 'coach':
        return 'bg-primary text-white';
      case 'player':
        return 'bg-primary text-white';
      case 'doctor':
        return 'bg-primary text-white';
      case 'technicalManager':
        return 'bg-primary text-white';
      case 'physiotherapist':
        return 'bg-primary text-white';
      case 'assistantCoach':
        return 'bg-primary text-white';
      case 'fitnessCoach':
        return 'bg-primary text-white';
      default:
        return 'bg-secondary text-white'; // Default class
    }
  }
}