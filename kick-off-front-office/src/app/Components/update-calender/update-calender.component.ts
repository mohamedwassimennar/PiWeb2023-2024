import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Match } from 'src/app/models/match';
import { TrainingCalendarService } from 'src/app/services/services/training-calendar.service';

@Component({
  selector: 'app-update-calender',
  templateUrl: './update-calender.component.html',
  styleUrls: ['./update-calender.component.css']
})
export class UpdateCalenderComponent {
  Id!: string;
  Details: Match = new Match();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private trainingService: TrainingCalendarService
  ) {}

  ngOnInit(): void {
    this.Id = this.route.snapshot.params['id'];

    this.trainingService.getMatchById(this.Id).subscribe(
      (data) => {
        this.Details = data;
      },
      (error) => {
        console.log('Error fetching details:', error);
      }
    );
  }

  update() {
    this.trainingService.updateMatch(this.Id, this.Details).subscribe(
      (data) => {
        console.log('Analysis updated successfully!');
        this.router.navigate(['/internships', this.Id]);
      },
      (error) => {
        console.log('Error updating :', error);
      }
    );
  }
}