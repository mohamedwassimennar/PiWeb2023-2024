
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArchivedPlayerPerformanceComponent } from 'src/app/Components/player-performance/archived-player-performance/archived-player-performance.component';
import { AuthGuardService } from 'src/app/Services/authGuard/auth-guard.service';
import { PlayerPerformanceCreateComponent } from 'src/app/components/player-performance/player-performance-create/player-performance-create.component';
import { PlayerPerformanceDetailsComponent } from 'src/app/components/player-performance/player-performance-details/player-performance-details.component';
import { PlayerPerformanceListComponent } from 'src/app/components/player-performance/player-performance-list/player-performance-list.component';
import { PlayerPerformanceUpdateComponent } from 'src/app/components/player-performance/player-performance-update/player-performance-update.component';

const routes: Routes = [
    {path:'perfermance-list',component: PlayerPerformanceListComponent , canActivate: [AuthGuardService]},
    {path:'perfermance-create',component: PlayerPerformanceCreateComponent , canActivate: [AuthGuardService]},
    { path: 'update-performance/:id', component: PlayerPerformanceUpdateComponent , canActivate: [AuthGuardService]},
    { path: 'performance-details/:id', component: PlayerPerformanceDetailsComponent , canActivate: [AuthGuardService]},
    { path: "archivePerfermance", component:ArchivedPlayerPerformanceComponent , canActivate: [AuthGuardService]},

    




  ];

  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class MenuModuleRoutingModule { }