import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { TeamComponent } from './Components/team/team.component';
import { InjuriesComponent } from './Components/InjuriesManagement/injuries/injuries.component';
import { HomeComponent } from './Components/home/home.component';
import { ForwhoComponent } from './Components/forwho/forwho.component';
import { ScoutsetmatchesComponent } from './Components/scoutsetmatches/scoutsetmatches.component';
import { HttpClientModule } from '@angular/common/http';
import { AddInjuryComponent } from './Components/InjuriesManagement/add-injury/add-injury.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UpdateInjuryComponent } from './Components/InjuriesManagement/update-injury/update-injury.component';
import { AddRecoveryPlanComponent } from './Components/InjuriesManagement/add-recovery-plan/add-recovery-plan.component';
import { UpdateRecoveryPlanComponent } from './Components/InjuriesManagement/update-recovery-plan/update-recovery-plan.component';
import { RecoveryComponent } from './Components/InjuriesManagement/recovery/recovery.component';
import { AddPreventionComponent } from './Components/InjuriesManagement/add-prevention/add-prevention.component';
import { UpdatePreventionComponent } from './Components/InjuriesManagement/update-prevention/update-prevention.component';
import { PreventionComponent } from './Components/InjuriesManagement/prevention/prevention.component';
import { Sdg3Component } from './Components/InjuriesManagement/sdg3/sdg3.component';
import { ExterneInjuriesComponent } from './Components/InjuriesManagement/externe-injuries/externe-injuries.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { CalenderComponent } from './Components/InjuriesManagement/calender-wassim/calender-wassim.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { HealthComponent } from './Components/health/health.component';
import { ArchivedInjuriesComponent } from './Components/InjuriesManagement/archived-injuries/archived-injuries.component';
import { ArchivedRecoveryComponent } from './Components/InjuriesManagement/archived-recovery/archived-recovery.component';
import { ArchivedPreventionsComponent } from './Components/InjuriesManagement/archived-preventions/archived-preventions.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { ModifyscoutplayerComponent } from './Components/playerScout/modifyscoutplayer/modifyscoutplayer.component';
import { DetailsscoutplayerComponent } from './Components/playerScout/detailsscoutplayer/detailsscoutplayer.component';
import { ScoutplayerlistComponent } from './Components/playerScout/scoutplayerlist/scoutplayerlist.component';
import { AddscoutplayerComponent } from './Components/playerScout/addscoutplayer/addscoutplayer.component';
import { MatchesComponent } from './Components/matches/matches.component';
import { NewsfootballComponent } from './Components/newsfootball/newsfootball.component';
import { MatchesapiComponent } from './Components/matchesapi/matchesapi.component';
import { MatchComponent } from './Components/match/match.component';
import { MyleagueComponent } from './Components/myleague/myleague.component';
import { CalenderleagueComponent } from './Components/calenderleague/calenderleague.component';
import { EventDetailsModalComponent } from './Components/event-details-modal/event-details-modal.component';
import { MatDialogModule } from '@angular/material/dialog'; // Import MatDialogModule
import { ContactFormComponent } from './Components/Contact/contact-form/contact-form.component';
import { AddCalendarComponent } from './Components/add-calendar/add-calendar.component';
import { UpdateCalenderComponent } from './Components/update-calender/update-calender.component';
import { StagesComponent } from './Components/stages/stages.component';
import { EventComponent } from './Components/event/event.component';
import { CalendrierComponent } from './Components/calendrier/calendrier.component';
import { MeetnigComponent } from './Components/meetnig/meetnig.component';
import { JitsiComponent } from './Components/jitsi/jitsi.component';
import { AddmeetingComponent } from './Components/addemeeting/addmeeting.component';

import { TrainigdetailmodalComponent } from './trainigdetailmodal/trainigdetailmodal.component';
import { StagedetailmodalComponent } from './Components/stagedetailmodal/stagedetailmodal.component';
import { MeetingdetailmodalComponent } from './Components/meetingdetailmodal/meetingdetailmodal.component';
import { AppdetailmodalComponent } from './Components/appdetailmodal/appdetailmodal.component'; 
import { AddTrainingComponent } from './Components/add-training/add-training.component';
import { UpdateTrainingComponent } from './Components/update-training/update-training.component';
import { TrainingComponent } from './Components/training/training.component';
import { ChatComponent } from './Components/InjuriesManagement/chat/chat.component';
import { FileUploadComponentComponent } from './Components/file-upload-component/file-upload-component.component';

import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { TopplayerComponent } from './Components/topplayer/topplayer.component';

const config: SocketIoConfig = { url: 'http://localhost:3000', options: {} };



@NgModule({
  declarations: [
    AppComponent,
    TeamComponent,
    InjuriesComponent,
    HomeComponent,
    ForwhoComponent,
    ScoutsetmatchesComponent,
    AddInjuryComponent,
    UpdateInjuryComponent,
    AddRecoveryPlanComponent,
    UpdateRecoveryPlanComponent,
    RecoveryComponent,
    PreventionComponent,
    AddPreventionComponent,
    UpdatePreventionComponent,
    Sdg3Component,
    ExterneInjuriesComponent,
    CalenderComponent,
    HealthComponent,
    ArchivedInjuriesComponent,
    ArchivedRecoveryComponent,
    ArchivedPreventionsComponent,
    AddscoutplayerComponent,
    ScoutplayerlistComponent,
    ModifyscoutplayerComponent,
    DetailsscoutplayerComponent,
    MatchesComponent,
    NewsfootballComponent,
    MatchesapiComponent,
    MatchComponent,
    MyleagueComponent,
    CalenderleagueComponent,
    EventDetailsModalComponent,
    ContactFormComponent,
    AddTrainingComponent,
    UpdateTrainingComponent,
    AddCalendarComponent,
    UpdateCalenderComponent,
    StagesComponent,
    EventComponent,
    CalendrierComponent,
    MeetnigComponent,
    JitsiComponent,
    AddmeetingComponent,
    TrainigdetailmodalComponent,
    StagedetailmodalComponent,
    MeetingdetailmodalComponent,
    AppdetailmodalComponent,
    TrainingComponent,
    ChatComponent,
    FileUploadComponentComponent,
    TopplayerComponent



  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    NgxPaginationModule,
    FullCalendarModule ,
    MatDialogModule,
    SharedModule,
    ReactiveFormsModule,
    SocketIoModule.forRoot(config),


  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
