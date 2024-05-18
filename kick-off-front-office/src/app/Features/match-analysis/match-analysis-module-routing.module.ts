
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArchiveMatchsComponent } from 'src/app/Components/match-analysis/archive-matchs/archive-matchs.component';
import { AuthGuardService } from 'src/app/Services/authGuard/auth-guard.service';
import { MatchAnalysisCreateComponent } from 'src/app/components/match-analysis/match-analysis-create/match-analysis-create.component';
import { MatchAnalysisDetailsComponent } from 'src/app/components/match-analysis/match-analysis-details/match-analysis-details.component';
import { MatchAnalysisListComponent } from 'src/app/components/match-analysis/match-analysis-list/match-analysis-list.component';
import { MatchAnalysisUpdateComponent } from 'src/app/components/match-analysis/match-analysis-update/match-analysis-update.component';
 


const routes: Routes = [
    {path:'analyses-match',component: MatchAnalysisListComponent , canActivate: [AuthGuardService]},
    {path:'match-analysis-details/:id',component: MatchAnalysisDetailsComponent , canActivate: [AuthGuardService]},
    {path:'match-analysis-update/:id',component: MatchAnalysisUpdateComponent, canActivate: [AuthGuardService]},
    {path:'match-analysis-add',component:MatchAnalysisCreateComponent, canActivate: [AuthGuardService]},
    { path: "archiveMatchs", component:ArchiveMatchsComponent , canActivate: [AuthGuardService]},


  ];

  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class MenuModuleRoutingModule { }