import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TrainingService } from '../Services/training.service';
import { Match, Meet, Reser, TrainingPlan } from '../models/training.model';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AppdetailmodalComponent } from '../appdetailmodal/appdetailmodal.component';
import { MeetingdetailmodalComponent } from '../meetingdetailmodal/meetingdetailmodal.component';
import { StagedetailmodalComponent } from '../stagedetailmodal/stagedetailmodal.component';
import { EventDetailsModalComponent } from '../event-details-modal/event-details-modal.component';
import { AuthService } from '../Services/auth/auth.service';


@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {
  backgroundImageSrc: string = '../../../assets/images/fooball.jpg'; // Update this with the path to your image

  plansFormation: TrainingPlan[] = [];
  meetings: Meet[] = [];
  matches: Match[] = [];
  events: Reser[] = [];
  isSubMenuOpen: boolean = false;
  isUserSubMenuOpen: boolean = false;
  toggleUserSubMenu() {
    this.isUserSubMenuOpen = !this.isUserSubMenuOpen;
  }
  toggleSubMenu(): void {
    this.isSubMenuOpen = !this.isSubMenuOpen;
  }
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

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private trainingService: TrainingService, private modalService: NgbModal, public dialog: MatDialog, private authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.fetchTrainingPlans();
    this.fetchMeetings();
    this.fetchMatches();
    this.fetchEvents();
  }

  logout(): void {
    this.authService.performLogout().subscribe(
      () => {
        console.log('Logout successful');
        // Redirect the user to the login page after successful logout
        window.location.href = 'http://localhost:4200/user/login'; // Assuming the other project is running on port 4201
      },
      error => {
        console.error('Logout error:', error);
      }
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
      } else if (eventDetails.meettype) {
        // Gérer les détails de l'événement de réunion avec un joueur
        this.openEventDetailsModal4(eventDetails);
      }
    }
  }
  openEventDetailsModal(eventDetails: any): void {
    const dialogRef: MatDialogRef<EventDetailsModalComponent> = this.dialog.open(EventDetailsModalComponent, {
      width: '250px',
      data: { eventDetails: eventDetails },

    });
  }
  isPerformanceSubMenuOpen: boolean = false;

  togglePerformanceSubMenu() {
    this.isPerformanceSubMenuOpen = !this.isPerformanceSubMenuOpen;
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

  fetchEvents(): void {
    this.trainingService.getAllEvents()
      .subscribe(events => {
        this.events = events;
        this.prepareEventEvents();
      });
  }
  prepareEventEvents(): void {
    const eventEvents = this.events.map(event => ({
      id: event._id,
      title: `Appointment `,
      start: new Date(event.date),
      extendedProps: { data: event }

    }));

    this.calendarOptions.events = this.calendarOptions.events.concat(eventEvents);
  }
  fetchMatches(): void {
    this.trainingService.getAllMatches()
      .subscribe(matches => {
        this.matches = matches;
        this.prepareMatchEvents();
      });
  }
  prepareMatchEvents(): void {
    const matchEvents = this.matches.map(match => ({
      id: match._id,
      title: `Internships `,
      start: new Date(match.startDate),
      extendedProps: { data: match }
    }));

    this.calendarOptions.events = this.calendarOptions.events.concat(matchEvents);
  }


  fetchMeetings(): void {
    this.trainingService.getAllMeets()
      .subscribe(meetings => {
        this.meetings = meetings;
        this.prepareMeetingEvents();
      });
  }

  prepareMeetingEvents(): void {
    const meetingEvents = this.meetings.map(meeting => ({
      id: meeting._id,
      title: `Meeting `,
      start: new Date(meeting.date),
      extendedProps: { data: meeting }
    }));

    this.calendarOptions.events = this.calendarOptions.events.concat(meetingEvents);
  }
  fetchTrainingPlans(): void {
    this.trainingService.getAllTrainingPlans()
      .subscribe(plans => {
        this.plansFormation = plans;
        this.prepareCalendarEvents();
      });
  }

  prepareCalendarEvents(): void {
    const events = this.plansFormation.map(plan => ({
      id: plan._id,
      title: `Training `,
      start: new Date(plan.date),
      extendedProps: { data: plan }
    }));

    this.calendarOptions.events = events;
  }




  handleEventDrop(eventDropInfo: any): void {
    const planId = eventDropInfo.event.id;
    const newDate = eventDropInfo.event.start;

    const updatedPlan = this.plansFormation.find(plan => plan._id === planId);
    if (updatedPlan) {
      updatedPlan.date = newDate
      this.updateTrainingPlanDate(updatedPlan);
    }
    const updatedMeeting = this.meetings.find(meeting => meeting._id === planId);
    if (updatedMeeting) {
      updatedMeeting.date = newDate;
      this.updateMeetingDate(updatedMeeting);
    }
    const updatedMatch = this.matches.find(match => match._id === planId);
    if (updatedMatch) {
      updatedMatch.startDate = newDate;
      this.updateMatchDate(updatedMatch);
    }
    const updatedEvent = this.events.find(event => event._id === planId);
    if (updatedEvent) {
      updatedEvent.date = newDate;
      this.updateEventDate(updatedEvent);
    }

  }
  updateEventDate(event: Reser): void {
    console.log('Tentative de mise à jour de la date de l\'événement :', event);

    this.trainingService.updateEvent(event._id, event)
      .subscribe(
        () => {
          console.log('Date de l\'événement mise à jour avec succès dans la base de données.');
        },
        error => {
          console.error('Une erreur est survenue lors de la mise à jour de la date de l\'événement :', error);
        }
      );
  }

  updateMatchDate(match: Match): void {
    console.log('Tentative de mise à jour de la date du match :', match);

    this.trainingService.updateMatch(match._id, match)
      .subscribe(
        () => {
          console.log('Date du match mise à jour avec succès dans la base de données.');
        },
        error => {
          console.error('Une erreur est survenue lors de la mise à jour de la date du match :', error);
        }
      );
  }
  updateMeetingDate(meeting: Meet): void {
    console.log('Tentative de mise à jour de la date de la réunion :', meeting);

    this.trainingService.updatemeet(meeting._id, meeting)
      .subscribe(
        () => {
          console.log('Date de la réunion mise à jour avec succès dans la base de données.');
        },
        error => {
          console.error('Une erreur est survenue lors de la mise à jour de la date de la réunion :', error);
        }
      );
  }

  updateTrainingPlanDate(plan: TrainingPlan): void {
    console.log('Tentative de mise à jour de la date de la formation :', plan);

    this.trainingService.updateTrainingPlan(plan._id, plan)
      .subscribe(
        () => {
          console.log('Date de la formation mise à jour avec succès dans la base de données.');
        },
        error => {
          console.error('Une erreur est survenue lors de la mise à jour de la date de la formation :', error);
        }
      );
  }

}


