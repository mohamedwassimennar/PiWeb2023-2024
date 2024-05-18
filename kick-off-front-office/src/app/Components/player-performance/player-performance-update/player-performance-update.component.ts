import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PlayerPerformanceService } from 'src/app/Services/player-performance.service';

@Component({
  selector: 'app-player-performance-update',
  templateUrl: './player-performance-update.component.html',
  styleUrls: ['./player-performance-update.component.css']
})
export class PlayerPerformanceUpdateComponent {
  performanceId!: string;
  performanceDetails: any; 
  successMessage: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private performanceService: PlayerPerformanceService 
  ) { }

  ngOnInit(): void {
    this.performanceId = this.route.snapshot.params['id']; 

    this.performanceService.getPerformanceById(this.performanceId).subscribe(
      (data) => {
        this.performanceDetails = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }



  updatePerformance() {
    this.performanceService.updatePerformance(this.performanceId, this.performanceDetails).subscribe(
      (data) => {
        console.log("Performance updated successfully!");
        this.successMessage = 'Performance updated successfully!';
        
        //this.router.navigate(['/PerfermancePlayer/performance-details', this.performanceId]);
         setTimeout(() => {
          this.clearSuccessMessage();
        }, 5000); 
      },
      
      (error) => {
        console.log(error);
      }
    );
  }
  clearSuccessMessage() {
    this.successMessage = '';
  }
  navigateBack() {
    this.router.navigate(['/PerfermancePlayer/perfermance-list']);
  }


}
