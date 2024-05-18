import { Component, OnInit } from '@angular/core';
import { Injury } from 'src/app/models/injury.model';
import { InjuryService } from 'src/app/Services/injury.service';

@Component({
  selector: 'app-archived-injuries',
  templateUrl: './archived-injuries.component.html',
  styleUrls: ['./archived-injuries.component.css']
})
export class ArchivedInjuriesComponent implements OnInit {
  archivedInjuries: Injury[] = [];

  constructor(private injuryService: InjuryService) { }

  ngOnInit(): void {
    this.fetchArchivedInjuries();
  }

  fetchArchivedInjuries(): void {
    this.injuryService.getArchivedInjuries()
      .subscribe(
        injuries => {
          this.archivedInjuries = injuries;
        },
        error => {
          console.error('Error fetching archived injuries:', error);
        }
      );
  }
}
