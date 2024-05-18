import { Component, OnInit } from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import { Match } from 'src/app/models/match';
import { TrainingPlan } from 'src/app/models/trainingPlan';
import { TrainingService } from 'src/app/services/tarining.service';
import { TrainingCalendarService } from 'src/app/services/services/training-calendar.service';
import { EventsService } from 'src/app/services/services/events.service';
import { Reser } from 'src/app/models/event';
import { Meet } from 'src/app/models/meet';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { TrainigdetailmodalComponent } from 'src/app/trainigdetailmodal/trainigdetailmodal.component';
import { StagedetailmodalComponent } from '../stagedetailmodal/stagedetailmodal.component';
import { MeetingdetailmodalComponent } from '../meetingdetailmodal/meetingdetailmodal.component';
import { AppdetailmodalComponent } from '../appdetailmodal/appdetailmodal.component';


@Component({

  selector: 'app-calendrier',

  templateUrl: './calendrier.component.html',

  styleUrls: ['./calendrier.component.css']

})

export class CalendrierComponent implements OnInit {
  trainingPlans: TrainingPlan[] = [];
  trainingId !: string;
  matches: Match[] = [];
  evenements: Reser[] = [];
  evenem: Meet[] = [];

  calendarOptions: any = {
    plugins: [dayGridPlugin],
    initialView: 'dayGridMonth',
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay'
    },
    selectable: true,
    editable: true,
    eventClick: this.handleEventClick.bind(this),

    allEvents: []
  };
  constructor(private route: ActivatedRoute,
    private router: Router, private trainingService: TrainingService, private TrainingCalendarService: TrainingCalendarService, private eventsService: EventsService, public dialog: MatDialog) { }

  ngOnInit() {
    this.getTrainingPlans();
    this.trainingId = this.route.snapshot.params['id'];
    this.getMatches();
    this.prepareCalendarEvents();
    this.loadEvents();
    this.getMatches1();

  }

  loadEvents(): void {
    this.eventsService.getAllEvents().subscribe(
      (data: Reser[]) => {
        this.evenements = data;
        this.prepareCalendarEvents();


      },

    );
  }
  handleEventClick(eventInfo: any): void {
    const eventDetails = eventInfo.event.extendedProps.data;
    if (eventDetails) {
      if (eventDetails.startDate) {
        // Gérer les détails de l'événement de stage
        this.openEventDetailsModal1(eventDetails);
      } else if (eventDetails.trainingType) {
        // Gérer les détails de l'événement d'entraînement
        this.openEventDetailsModal(eventDetails);
      } else if (eventDetails.reservationType) {
        // Gérer les détails de l'événement de réunion
        this.openEventDetailsModal3(eventDetails);
      } else if (eventDetails.meettype === 'player') {
        // Gérer les détails de l'événement de réunion avec un joueur
        this.openEventDetailsModal4(eventDetails);
      }
    }
  }
  openEventDetailsModal(eventDetails: any): void {
    const dialogRef: MatDialogRef<TrainigdetailmodalComponent> = this.dialog.open(TrainigdetailmodalComponent, {
      width: '250px',
      data: { eventDetails: eventDetails },

    });
  }


  openEventDetailsModal1(eventDetails: any): void {
    const dialogRef: MatDialogRef<StagedetailmodalComponent> = this.dialog.open(StagedetailmodalComponent, {
      width: '250px',
      data: { eventDetails: eventDetails },

    });
  }
  openEventDetailsModal3(eventDetails: any): void {
    const dialogRef: MatDialogRef<MeetingdetailmodalComponent> = this.dialog.open(MeetingdetailmodalComponent, {
      width: '250px',
      data: { eventDetails: eventDetails },

    });

  }
  openEventDetailsModal4(eventDetails: any): void {
    const dialogRef: MatDialogRef<AppdetailmodalComponent> = this.dialog.open(AppdetailmodalComponent, {
      width: '250px',
      data: { eventDetails: eventDetails },

    });

  }



  getMatches1() {
    this.TrainingCalendarService.getAllMatches()
      .subscribe(
        matches => {
          this.matches = matches;
          this.prepareCalendarEvents();

        },

      );
  }


  getTrainingPlans() {
    this.trainingService.getAllTrainingPlans()
      .subscribe(
        plans => {
          this.trainingPlans = plans;
          this.prepareCalendarEvents();
        },

      );
  }
  getMatches() {
    this.eventsService.getAllMeets()
      .subscribe(
        evenem => {
          this.evenem = evenem;
          this.prepareCalendarEvents();
        },
        error => {
          console.error('Erreur lors du chargement meet :', error);
        }
      );
  }
  prepareCalendarEvents(): void {

    const trainingEvents = this.trainingPlans.map(plan => ({
      id: plan._id,
      title: `Training:${plan.trainingType}`,
      start: plan.date,
      extendedProps: { data: plan }
    }));


    const matchEvents = this.matches.map(match => ({
      id: match._id,
      title: `Internship :${match.lieu}`,
      start: match.startDate,
      extendedProps: { data: match }


    }));
    const eventEvents = this.evenements.map(event => ({
      id: event._id,
      title: `Appointment:${event.reservationType}`,
      start: event.date,
      extendedProps: { data: event }

    }));
    const eventEvent = this.evenem.map(event => ({
      id: event._id,
      title: 'Meeting',
      start: event.date,
      extendedProps: { data: event }
    }));
    const allEvents = [...trainingEvents, ...matchEvents, ...eventEvents, ...eventEvent];
    this.calendarOptions.events = allEvents;


  }



}





  

