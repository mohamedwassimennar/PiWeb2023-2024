import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './Components/dashboard/dashboard.component';


import { ProfileComponent } from './Components/profile/profile.component';

import { ShowRoleComponent } from './Components/show-role/show-role.component';
import { ArchivedUsersComponent } from './Components/archived-users/archived-users.component';
import { InscriptionComponent } from './Components/inscription/inscription.component';
import { UserChartComponent } from './Components/user-chart/user-chart.component';
import { HealthComponent } from './Health Care/health/health.component';
import { InjuriesComponent } from './Health Care/injuries/injuries.component';
import { RecoveryComponent } from './Health Care/recovery/recovery.component';
import { PreventionComponent } from './Health Care/prevention/prevention.component';
import { ArchivedInjuriesComponent } from './Health Care/archived-injuries/archived-injuries.component';
import { ArchivedRecoveriesComponent } from './Health Care/archived-recoveries/archived-recoveries.component';
import { ArchivedPreventionsComponent } from './Health Care/archived-preventions/archived-preventions.component';
import { ScoutplayerlistComponent } from './playerScout/scoutplayerlist/scoutplayerlist.component';
import { AddscoutplayerComponent } from './playerScout/addscoutplayer/addscoutplayer.component';
import { DetailsscoutplayerComponent } from './playerScout/detailsscoutplayer/detailsscoutplayer.component';
import { ModifyscoutplayerComponent } from './playerScout/modifyscoutplayer/modifyscoutplayer.component';
import { MyleaguelistComponent } from './myLeague/myleaguelist/myleaguelist.component';
import { AddleagueComponent } from './myLeague/addleague/addleague.component';
import { ArchievedplayersComponent } from './playerScout/archievedplayers/archievedplayers.component';
import { ModifyleagueComponent } from './myLeague/modifyleague/modifyleague.component';
import { TrainingComponent } from './training/training.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { ScheduleInternshipsComponent } from './schedule-internships/schedule-internships.component';
import { AppointmentComponent } from './appointment/appointment.component';
import { MeetingComponent } from './meeting/meeting.component';
import { PlayerPerfermanceComponent } from './Components/player-perfermance/player-perfermance.component';
import { ArchivedPlayerPerformanceComponent } from './Components/archived-player-performance/archived-player-performance.component';
import { PerformanceSummaryListComponent } from './Components/performance-summary-list/performance-summary-list.component';
import { MatchAnalysisListComponent } from './Components/match-analysis-list/match-analysis-list.component';
import { ArchiveMatchsComponent } from './Components/archive-matchs/archive-matchs.component';
import { ArchivesummuryComponent } from './Components/archivesummury/archivesummury.component';
import { ArchievedmatchedComponent } from './myLeague/archievedmatched/archievedmatched.component';
import { ArchivetrainingComponent } from './archivetraining/archivetraining.component';
import { ArchivematchComponent } from './archivematch/archivematch.component';
import { ArchiveappComponent } from './archiveapp/archiveapp.component';
import { ArchivemeetComponent } from './archivemeet/archivemeet.component';
import { CoachComponent } from './Components/roles/coach/coach.component';
import { DoctorComponent } from './Components/roles/doctor/doctor.component';
import { FitnessCoachComponent } from './Components/roles/fitness-coach/fitness-coach.component';
import { PlayerComponent } from './Components/roles/player/player.component';
import { TechnicalManagerComponent } from './Components/roles/technical-manager/technical-manager.component';
import { AssistantCoachComponent } from './Components/roles/assistant-coach/assistant-coach.component';
import { PhysiotherapistComponent } from './Components/roles/physiotherapist/physiotherapist.component';

const routes: Routes = [
 
  { path: 'role', component: ShowRoleComponent },
  { path: 'archived-users', component: ArchivedUsersComponent },
  { path: 'inscription', component: InscriptionComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'coach', component: CoachComponent },
  { path: 'doctor', component: DoctorComponent },
  { path: 'fitnessCoach', component: FitnessCoachComponent },
  { path: 'player', component: PlayerComponent },
  { path: 'technicalManager', component: TechnicalManagerComponent },
  { path: 'assistantCoach', component: AssistantCoachComponent },
  { path: 'physiotherapist', component: PhysiotherapistComponent },

  

  { path: "dash", component: DashboardComponent },
  { path: "health", component: HealthComponent },
  { path: "injuries", component: InjuriesComponent},
  { path: "recoveries", component: RecoveryComponent },
  { path: "preventions", component: PreventionComponent },
  { path: "archivedinjuries", component: ArchivedInjuriesComponent},
  { path: "archivedrecoveries", component: ArchivedRecoveriesComponent },
  { path: "archivedpreventions", component: ArchivedPreventionsComponent },

  //nidhal
  { path: "scout", component: ScoutplayerlistComponent },
  { path: "addscout", component: AddscoutplayerComponent },
  { path: "scoutdetails/:id", component: DetailsscoutplayerComponent },
  { path: "modifyscout/:id", component: ModifyscoutplayerComponent },
  { path: 'archive', component: ArchievedplayersComponent },
  { path: 'archive2', component: ArchievedmatchedComponent },
  { path: "myleague", component: MyleaguelistComponent },
  { path: "addleague", component: AddleagueComponent },
  { path: "modifyleague/:id", component: ModifyleagueComponent },

  //said
  { path: "training", component: TrainingComponent },
  { path: "Schedule", component: ScheduleComponent },
  { path: "internships", component: ScheduleInternshipsComponent },
  { path: "appointment", component: AppointmentComponent },
  { path: "meeting", component: MeetingComponent },
  { path: "perfermance", component:PlayerPerfermanceComponent },
  { path: "archivePerfermance", component:ArchivedPlayerPerformanceComponent },
  { path: "perfermancesummary", component:PerformanceSummaryListComponent },
  { path: "matchAnalysis", component:MatchAnalysisListComponent },
  { path: "archiveMatchs", component:ArchiveMatchsComponent },
  { path: "archiveSummury", component:ArchivesummuryComponent },
{ path: "archives", component: ArchivemeetComponent },
  { path: "archivee", component: ArchiveappComponent },
  { path: "archivess", component: ArchivematchComponent },
  { path: "archiveé", component: ArchivetrainingComponent },

  { path: "**", component:DashboardComponent },





];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})


export class AppRoutingModule {

}
