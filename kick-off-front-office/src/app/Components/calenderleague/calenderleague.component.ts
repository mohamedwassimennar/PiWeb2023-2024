import { Component, OnInit } from '@angular/core';
import { MyLeague } from '../../models/myLeague';
import { MyleagueService } from '../../Services/myleague.service';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { MatDialog } from '@angular/material/dialog';
import { EventDetailsModalComponent } from '../event-details-modal/event-details-modal.component';



@Component({
  selector: 'app-calenderleague',
  templateUrl: './calenderleague.component.html',
  styleUrls: ['./calenderleague.component.css']
})
export class CalenderleagueComponent implements OnInit {
  injuries: MyLeague[] = [];

  calendarOptions: any = {
    plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
    initialView: 'dayGridMonth',
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay'
    },
    selectable: true,
    editable: true,
    eventClick: this.handleEventClick.bind(this),
    eventDrop: this.handleEventDrop.bind(this),
    events: []
  };

  constructor(private injuryService: MyleagueService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.fetchInjuries();
  }

  fetchInjuries(): void {
    this.injuryService.getAll()
      .subscribe(injuries => {
        this.injuries = injuries;
        this.prepareCalendarEvents();
      });
  }

  prepareCalendarEvents(): void {
    const events = this.injuries.map(injury => ({
      id: injury._id, // Assuming each injury has a unique identifier
      title: `${injury.opponent} vs ${injury.team}`,
      start: injury.date,
      extendedProps: { data: injury } // Passing whole data to the event
    }));

    this.calendarOptions.events = events;
  }

  handleEventClick(eventInfo: any): void {
    const eventDetails = eventInfo.event.extendedProps.data;
    this.openEventDetailsModal(eventDetails);
  }

  openEventDetailsModal(eventDetails: MyLeague): void {
    const dialogRef = this.dialog.open(EventDetailsModalComponent, {
      width: '400px',
      data: { eventDetails: eventDetails } // Pass the eventDetails object with a key
    });
  }
  

  handleEventDrop(eventDropInfo: any): void {
    const eventId = eventDropInfo.event.id;
    const newDate = eventDropInfo.event.start;

    // Find the corresponding injury and update its date
    const updatedInjury = this.injuries.find(injury => injury._id === eventId);
    if (updatedInjury) {
      updatedInjury.date = newDate;
      // Update the date in the database
      this.updateInjuryDate(updatedInjury);
    }
  }

  updateInjuryDate(injury: MyLeague): void {
    this.injuryService.update(injury._id, injury)
      .subscribe(() => {
        console.log('Injury date updated successfully in the database.');
      }, error => {
        console.error('Error occurred while updating injury date:', error);
      });
  }
}