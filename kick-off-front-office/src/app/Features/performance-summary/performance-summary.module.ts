import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MenuModuleRoutingModule } from './performance-summary-module-routing.module';
import { PerformanceSummaryListComponent } from 'src/app/components/performance-summary/performance-summary-list/performance-summary-list.component';
import { PerformanceSummaryDetailsComponent } from 'src/app/components/performance-summary/performance-summary-details/performance-summary-details.component';
import { PerformanceSummaryCreateComponent } from 'src/app/components/performance-summary/performance-summary-create/performance-summary-create.component';
import { PerformanceSummaryUpdateComponent } from 'src/app/components/performance-summary/performance-summary-update/performance-summary-update.component';
import { ArchivesummuryComponent } from 'src/app/Components/performance-summary/archivesummury/archivesummury.component';
import { SharedModule } from 'src/app/shared/shared.module';




@NgModule({
  declarations: [ 
     PerformanceSummaryListComponent,
    PerformanceSummaryDetailsComponent,
    PerformanceSummaryCreateComponent,
    PerformanceSummaryUpdateComponent,
  ArchivesummuryComponent
  
  ],
  imports: [
    CommonModule,
    FormsModule,
     RouterModule.forChild([]) ,
     MenuModuleRoutingModule,
     ReactiveFormsModule,
     SharedModule
  ]
})
export class PerformanceSummaryModule { }
