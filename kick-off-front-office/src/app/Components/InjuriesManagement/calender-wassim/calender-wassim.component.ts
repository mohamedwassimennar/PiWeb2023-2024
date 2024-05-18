import { Component, OnInit } from '@angular/core';
import { Injury } from 'src/app/models/injury.model';
import { InjuryService } from 'src/app/Services/injury.service';
import dayGridPlugin from '@fullcalendar/daygrid';

@Component({
  selector: 'app-calender',
  templateUrl: './calender-wassim.component.html',
  styleUrls: ['./calender-wassim.component.css']
})
export class CalenderComponent implements OnInit {
  injuries: Injury[] = [];

  calendarOptions: any = {
    plugins: [dayGridPlugin],
    initialView: 'dayGridMonth',
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,dayGridWeek,dayGridDay'
    },
    events: []
  };

  constructor(private injuryService: InjuryService) { }

  ngOnInit(): void {
    this.fetchInjuries();
  }

  fetchInjuries(): void {
    this.injuryService.getAllInjuries()
      .subscribe(injuries => {
        // Filtrer les blessures non archivées
        this.injuries = injuries.filter(injury => !injury.archived);
        this.prepareCalendarEvents();
      });
  }

  prepareCalendarEvents(): void {
    const events = this.injuries.map(injury => ({
      title: `${injury.playerName} injured`,
      start: injury.date
    }));

    this.calendarOptions.events = events;
  }
}
