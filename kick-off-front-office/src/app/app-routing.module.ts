import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './Services/authGuard/auth-guard.service';
import { InjuriesComponent } from './Components/InjuriesManagement/injuries/injuries.component';
import { TeamComponent } from './Components/team/team.component';
import { HomeComponent } from './Components/home/home.component';
import { TrainingComponent } from './Components/training/training.component';
import { ForwhoComponent } from './Components/forwho/forwho.component';
import { ScoutsetmatchesComponent } from './Components/scoutsetmatches/scoutsetmatches.component';
import { AddInjuryComponent } from './Components/InjuriesManagement/add-injury/add-injury.component';
import { UpdateInjuryComponent } from './Components/InjuriesManagement/update-injury/update-injury.component';
import { AddRecoveryPlanComponent } from './Components/InjuriesManagement/add-recovery-plan/add-recovery-plan.component';
import { UpdateRecoveryPlanComponent } from './Components/InjuriesManagement/update-recovery-plan/update-recovery-plan.component';
import { RecoveryComponent } from './Components/InjuriesManagement/recovery/recovery.component';
import { PreventionComponent } from './Components/InjuriesManagement/prevention/prevention.component';
import { UpdatePreventionComponent } from './Components/InjuriesManagement/update-prevention/update-prevention.component';
import { AddPreventionComponent } from './Components/InjuriesManagement/add-prevention/add-prevention.component';
import { Sdg3Component } from './Components/InjuriesManagement/sdg3/sdg3.component';
import { ExterneInjuriesComponent } from './Components/InjuriesManagement/externe-injuries/externe-injuries.component';
import { CalenderComponent } from './Components/InjuriesManagement/calender-wassim/calender-wassim.component';
import { HealthComponent } from './Components/health/health.component';
import { ArchivedInjuriesComponent } from './Components/InjuriesManagement/archived-injuries/archived-injuries.component';
import { ArchivedRecoveryComponent } from './Components/InjuriesManagement/archived-recovery/archived-recovery.component';
import { ArchivedPreventionsComponent } from './Components/InjuriesManagement/archived-preventions/archived-preventions.component';
import { DetailsscoutplayerComponent } from './Components/playerScout/detailsscoutplayer/detailsscoutplayer.component';
import { AddscoutplayerComponent } from './Components/playerScout/addscoutplayer/addscoutplayer.component';
import { ModifyscoutplayerComponent } from './Components/playerScout/modifyscoutplayer/modifyscoutplayer.component';
import { ScoutplayerlistComponent } from './Components/playerScout/scoutplayerlist/scoutplayerlist.component';
import { MatchesComponent } from './Components/matches/matches.component';
import { NewsfootballComponent } from './Components/newsfootball/newsfootball.component';
import { MatchesapiComponent } from './Components/matchesapi/matchesapi.component';
import { MatchComponent } from './Components/match/match.component';
import { MyleagueComponent } from './Components/myleague/myleague.component';
import { CalenderleagueComponent } from './Components/calenderleague/calenderleague.component';
import { ContactFormComponent } from './Components/Contact/contact-form/contact-form.component';
import { AddTrainingComponent } from './Components/add-training/add-training.component';
import { UpdateTrainingComponent } from './Components/update-training/update-training.component';
import { AddCalendarComponent } from './Components/add-calendar/add-calendar.component';
import { UpdateCalenderComponent } from './Components/update-calender/update-calender.component';
import { StagesComponent } from './Components/stages/stages.component';
import { EventComponent } from './Components/event/event.component';
import { CalendrierComponent } from './Components/calendrier/calendrier.component';
import { MeetnigComponent } from './Components/meetnig/meetnig.component';
import { JitsiComponent } from './Components/jitsi/jitsi.component';
import { AddmeetingComponent } from './Components/addemeeting/addmeeting.component';
import { CoachAuthGuardService } from './Services/authGuard/coach-auth-guard.service';
import { PlayerAuthGuardService } from './Services/authGuard/player-auth-guard.service';
import { ChatComponent } from './Components/InjuriesManagement/chat/chat.component';
import { FileUploadComponentComponent } from './Components/file-upload-component/file-upload-component.component';
import { TopplayerComponent } from './Components/topplayer/topplayer.component';



const routes: Routes = [
  //{ path: "", component: FirstPageComponent },
  { path: "Home", component: HomeComponent, canActivate: [AuthGuardService] },
  {
    path: 'user',
    loadChildren: () =>
      import('./Features/user/user.module').then((m) => m.UserModule),
  },
  { path: "contact", component: ContactFormComponent },

  {
    path: 'PerfermancePlayer',
    loadChildren: () =>
      import('./Features/perfermance-player/perfermance-player.module').then((m) => m.PerfermancePlayerModule),
  },
  {
    path: 'MatchAnalysise',
    loadChildren: () =>
      import('./Features/match-analysis/match-analysis.module').then((m) => m.MatchAnalysisModule),
  },
  {
    path: 'perfermance-summary',
    loadChildren: () =>
      import('./Features/performance-summary/performance-summary.module').then((m) => m.PerformanceSummaryModule),
  },
  { path: "FileUploadComponentComponent", component: FileUploadComponentComponent, canActivate: [AuthGuardService] },
  
  { path: "TopPlayer", component: TopplayerComponent, canActivate: [AuthGuardService] },


  // Jocker route pour toutes les autres routes non définies
  // Route pour un chemin d'accès vide redirigeant vers HomeComponent

  { path: "Injuries", component: InjuriesComponent, canActivate: [AuthGuardService] },
  { path: "Team", component: TeamComponent, canActivate: [AuthGuardService] },
  { path: "Training", component: TrainingComponent, canActivate: [AuthGuardService] },
  { path: "Forwho", component: ForwhoComponent, canActivate: [AuthGuardService] },
  { path: "Scoutsetmatches", component: ScoutsetmatchesComponent, canActivate: [AuthGuardService] },
  { path: "addInjury", component: AddInjuryComponent, canActivate: [AuthGuardService] },
  { path: 'injuries/update/:id', component: UpdateInjuryComponent, canActivate: [AuthGuardService] },
  { path: "Recovery", component: RecoveryComponent, canActivate: [AuthGuardService] },
  { path: "addRecoveryPlan", component: AddRecoveryPlanComponent, canActivate: [AuthGuardService] },
  { path: 'recoveryPlan/update/:id', component: UpdateRecoveryPlanComponent, canActivate: [AuthGuardService] },
  { path: "Prevention", component: PreventionComponent, canActivate: [AuthGuardService] },
  { path: "addPrevention", component: AddPreventionComponent, canActivate: [AuthGuardService] },
  { path: 'prevention/update/:id', component: UpdatePreventionComponent, canActivate: [AuthGuardService] },
  { path: 'sdg3', component: Sdg3Component, canActivate: [AuthGuardService] },
  { path: 'externalInjuries', component: ExterneInjuriesComponent, canActivate: [AuthGuardService] },
  { path: 'CalenderW', component: CalenderComponent, canActivate: [AuthGuardService] },
  { path: 'Health', component: HealthComponent, canActivate: [AuthGuardService] },
  { path: 'ArchivedInjuries', component: ArchivedInjuriesComponent, canActivate: [AuthGuardService] },
  { path: 'ArchivedRecovery', component: ArchivedRecoveryComponent, canActivate: [AuthGuardService] },
  { path: 'ArchivedPrevention', component: ArchivedPreventionsComponent, canActivate: [AuthGuardService] },
  { path: 'chat', component: ChatComponent, canActivate: [AuthGuardService] },
  //nidhal
  { path: "news", component: NewsfootballComponent, canActivate: [AuthGuardService] },
  { path: "match", component: MatchesComponent, canActivate: [AuthGuardService] },
  { path: "matchapi", component: MatchesapiComponent, canActivate: [AuthGuardService] },
  { path: "today", component: MatchComponent, canActivate: [AuthGuardService] },
  { path: "myleague", component: MyleagueComponent, canActivate: [AuthGuardService] },
  { path: "calenderleague", component: CalenderleagueComponent, canActivate: [AuthGuardService] },
  //{ path: "scout", component: ScoutplayerlistComponent, canActivate: [AuthGuardService] },
    { path: "scout", component: ScoutplayerlistComponent, canActivate: [AuthGuardService, CoachAuthGuardService]  },

  { path: "addscout", component: AddscoutplayerComponent, canActivate: [AuthGuardService] },
  { path: "scoutdetails/:id", component: DetailsscoutplayerComponent, canActivate: [AuthGuardService] },
  { path: "modifyscout/:id", component: ModifyscoutplayerComponent, canActivate: [AuthGuardService] },

  { path: "add", component: AddTrainingComponent, canActivate: [AuthGuardService] },
  { path: "update/:id", component: UpdateTrainingComponent, canActivate: [AuthGuardService] },
  { path: "said", component: AddCalendarComponent, canActivate: [AuthGuardService] },
  { path: "updates/:id", component: UpdateCalenderComponent, canActivate: [AuthGuardService] },
  { path: "internships", component: StagesComponent, canActivate: [AuthGuardService] },
  { path: "events", component: EventComponent, canActivate: [AuthGuardService] },
  { path: "calendrier", component: CalendrierComponent, canActivate: [AuthGuardService] },
  { path: "meeting", component: MeetnigComponent, canActivate: [AuthGuardService] },
  { path: "jitsi", component: JitsiComponent, canActivate: [AuthGuardService] },
  { path: "upd/:id", component: AddmeetingComponent, canActivate: [AuthGuardService] },

  // { path: "", redirectTo: "/Home", pathMatch: "full" },

  // Jocker route pour toutes les autres routes non définies
  // { path: "**", component: HomeComponent },
  // Route pour un chemin d'accès vide redirigeant vers HomeComponent
  //   { path: "", redirectTo: "/Home", pathMatch: "full" },
  { path: "**", component: HomeComponent, canActivate: [AuthGuardService] },

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
