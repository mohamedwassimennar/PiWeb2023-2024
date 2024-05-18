import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PlayerPerformance } from 'src/app/models/PlayerPerformance';
import { PlayerPerformanceService } from 'src/app/Services/player-performance.service';

@Component({
  selector: 'app-player-performance-details',
  templateUrl: './player-performance-details.component.html',
  styleUrls: ['./player-performance-details.component.css']
})
export class PlayerPerformanceDetailsComponent {
  
  performance: PlayerPerformance | undefined;

  constructor(private route: ActivatedRoute, private playerPerformanceService: PlayerPerformanceService,private router: Router) { }
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.playerPerformanceService.getPerformanceById(id)
        .subscribe(performance => {
          // Traitez les détails de la performance récupérée ici
          this.performance = performance;
        });
    }
  }
  navigateBack(): void {
    this.router.navigate(['/PerfermancePlayer/perfermance-list']); 
  }
}
