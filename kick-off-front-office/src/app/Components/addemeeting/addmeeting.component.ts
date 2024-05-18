import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Meet } from 'src/app/models/meet';
import { EventsService } from 'src/app/services/services/events.service';

@Component({
  selector: 'app-addmeeting',
  templateUrl: './addmeeting.component.html',
  styleUrls: ['./addmeeting.component.css']
})
export class AddmeetingComponent {
  analysisId!: string;
  analysisDetails: Meet = new Meet();
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private trainingService: EventsService
  ) { }


  ngOnInit(): void {
    this.analysisId = this.route.snapshot.params['id'];

    this.trainingService.getmeetById(this.analysisId).subscribe(
      (data) => {
        this.analysisDetails = data;
      },
      (error) => {
        console.log("Error fetching analysis details:", error);
      }
    );
  }
  updateAnalysis() {
    this.trainingService.updatemeet(this.analysisId, this.analysisDetails).subscribe(
      (data) => {
        this.router.navigate(['/meeting']);
      },
      (error) => {
        console.log("Error updating analysis:", error);
      }
    );
  }



  formaterDate(date: Date): string {
    return new Date(date).toLocaleDateString(); // Par exemple, "07/03/2024" pour le format "MM/JJ/AAAA"
  }
}

