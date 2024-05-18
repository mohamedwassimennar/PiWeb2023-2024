import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { DashboardComponent } from './Components/dashboard/dashboard.component';

import { ProfileComponent } from './Components/profile/profile.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ShowRoleComponent } from './Components/show-role/show-role.component';
import { FooterComponent } from './Components/footer/footer.component';
import { ArchivedUsersComponent } from './Components/archived-users/archived-users.component';
import { InscriptionComponent } from './Components/inscription/inscription.component';
import { UserChartComponent } from './Components/user-chart/user-chart.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { InjuriesComponent } from './Health Care/injuries/injuries.component';
import { RecoveryComponent } from './Health Care/recovery/recovery.component';
import { PreventionComponent } from './Health Care/prevention/prevention.component';
import { HealthComponent } from './Health Care/health/health.component';
import { ArchivedInjuriesComponent } from './Health Care/archived-injuries/archived-injuries.component';
import { ArchivedRecoveriesComponent } from './Health Care/archived-recoveries/archived-recoveries.component';
import { ArchivedPreventionsComponent } from './Health Care/archived-preventions/archived-preventions.component';
import { MyleaguelistComponent } from './myLeague/myleaguelist/myleaguelist.component';
import { AddleagueComponent } from './myLeague/addleague/addleague.component';
import { ModifyleagueComponent } from './myLeague/modifyleague/modifyleague.component';
import { ArchievedplayersComponent } from './playerScout/archievedplayers/archievedplayers.component';
import { AddscoutplayerComponent } from './playerScout/addscoutplayer/addscoutplayer.component';
import { DetailsscoutplayerComponent } from './playerScout/detailsscoutplayer/detailsscoutplayer.component';
import { ModifyscoutplayerComponent } from './playerScout/modifyscoutplayer/modifyscoutplayer.component';
import { ScoutplayerlistComponent } from './playerScout/scoutplayerlist/scoutplayerlist.component';
import { TrainingComponent } from './training/training.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { ScheduleInternshipsComponent } from './schedule-internships/schedule-internships.component';
import { AppointmentComponent } from './appointment/appointment.component';
import { MeetingComponent } from './meeting/meeting.component';
import { FullCalendarModule } from '@fullcalendar/angular'; 
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PlayerPerfermanceComponent } from './Components/player-perfermance/player-perfermance.component';
import { ArchivedPlayerPerformanceComponent } from './Components/archived-player-performance/archived-player-performance.component';
import { PerformanceSummaryListComponent } from './Components/performance-summary-list/performance-summary-list.component';
import { MatchAnalysisListComponent } from './Components/match-analysis-list/match-analysis-list.component';
import { ArchiveMatchsComponent } from './Components/archive-matchs/archive-matchs.component';
import { ArchivesummuryComponent } from './Components/archivesummury/archivesummury.component';
import { ArchievedmatchedComponent } from './myLeague/archievedmatched/archievedmatched.component';
import { ArchivemeetComponent } from './archivemeet/archivemeet.component';
import { ArchiveappComponent } from './archiveapp/archiveapp.component';
import { ArchivematchComponent } from './archivematch/archivematch.component';
import { ArchivetrainingComponent } from './archivetraining/archivetraining.component';
import { MatDialogModule } from '@angular/material/dialog';
import { NgChartsModule } from 'ng2-charts';
import { CoachComponent } from './Components/roles/coach/coach.component';
import { PlayerComponent } from './Components/roles/player/player.component';
import { TechnicalManagerComponent } from './Components/roles/technical-manager/technical-manager.component';
import { DoctorComponent } from './Components/roles/doctor/doctor.component';
import { PhysiotherapistComponent } from './Components/roles/physiotherapist/physiotherapist.component';
import { AssistantCoachComponent } from './Components/roles/assistant-coach/assistant-coach.component';
import { FitnessCoachComponent } from './Components/roles/fitness-coach/fitness-coach.component';







@NgModule({
  declarations: [
    AppComponent,

    DashboardComponent,
    ProfileComponent,
    ShowRoleComponent,
    FooterComponent,
    ArchivedUsersComponent,
    InscriptionComponent,
    UserChartComponent,
    InjuriesComponent,
    RecoveryComponent,
    PreventionComponent,
    HealthComponent,
    ArchivedInjuriesComponent,
    ArchivedRecoveriesComponent,
    ArchivedPreventionsComponent,
    AddscoutplayerComponent,
    DetailsscoutplayerComponent,
    ModifyscoutplayerComponent,
    ScoutplayerlistComponent,
    MyleaguelistComponent,
    AddleagueComponent,
    ModifyleagueComponent,
    ArchievedplayersComponent,
    TrainingComponent,
    ScheduleComponent,
    ScheduleInternshipsComponent,
    AppointmentComponent,
    MeetingComponent,
    PlayerPerfermanceComponent,
    ArchivedPlayerPerformanceComponent,
    PerformanceSummaryListComponent,
    MatchAnalysisListComponent,
    ArchiveMatchsComponent,
    ArchivesummuryComponent,
    ArchievedmatchedComponent,
     ArchivemeetComponent,
    ArchiveappComponent,
    ArchivematchComponent,
    ArchivetrainingComponent,
    CoachComponent,
    PlayerComponent,
    TechnicalManagerComponent,
    DoctorComponent,
    PhysiotherapistComponent,
    AssistantCoachComponent,
    FitnessCoachComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgxPaginationModule,
    FullCalendarModule,
    NgbModule,
    MatDialogModule,
    NgChartsModule

    
   
  ],
  
  providers: [],
  bootstrap: [AppComponent]
})


export class AppModule { }




