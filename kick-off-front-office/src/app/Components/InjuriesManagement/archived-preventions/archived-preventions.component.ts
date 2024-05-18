import { Component, OnInit } from '@angular/core';
import { Prevention } from 'src/app/models/prevention.model';
import { PreventionService } from 'src/app/Services/prevention.service';

@Component({
  selector: 'app-archived-preventions',
  templateUrl: './archived-preventions.component.html',
  styleUrls: ['./archived-preventions.component.css']
})
export class ArchivedPreventionsComponent implements OnInit {
  archivedPreventions: Prevention[] = [];

  constructor(private preventionService: PreventionService) { }

  ngOnInit(): void {
    this.fetchArchivedPreventions();
  }

  fetchArchivedPreventions(): void {
    this.preventionService.getArchivedPreventions()
      .subscribe(
        archivedPreventions => {
          this.archivedPreventions = archivedPreventions;
        },
        error => {
          console.error('Error fetching archived preventions:', error);
        }
      );
  }
}