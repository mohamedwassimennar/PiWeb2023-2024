
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArchivesummuryComponent } from 'src/app/Components/performance-summary/archivesummury/archivesummury.component';
import { AuthGuardService } from 'src/app/Services/authGuard/auth-guard.service';
import { PerformanceSummaryCreateComponent } from 'src/app/components/performance-summary/performance-summary-create/performance-summary-create.component';
import { PerformanceSummaryDetailsComponent } from 'src/app/components/performance-summary/performance-summary-details/performance-summary-details.component';
import { PerformanceSummaryListComponent } from 'src/app/components/performance-summary/performance-summary-list/performance-summary-list.component';
import { PerformanceSummaryUpdateComponent } from 'src/app/components/performance-summary/performance-summary-update/performance-summary-update.component';


const routes: Routes = [
    {path:'perfermance-summary-list',component: PerformanceSummaryListComponent , canActivate: [AuthGuardService]},
    { path: 'performance-summary-update/:id', component: PerformanceSummaryUpdateComponent , canActivate: [AuthGuardService]},
  { path: 'performance-summary-details/:id', component: PerformanceSummaryDetailsComponent , canActivate: [AuthGuardService]},
  { path: 'performance-summary-add', component: PerformanceSummaryCreateComponent , canActivate: [AuthGuardService]},
  { path: "archiveSummury", component:ArchivesummuryComponent , canActivate: [AuthGuardService]},





  ];

  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class MenuModuleRoutingModule { }