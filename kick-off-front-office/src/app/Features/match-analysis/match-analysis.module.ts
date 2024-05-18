import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MenuModuleRoutingModule } from './match-analysis-module-routing.module';
import { MatchAnalysisListComponent } from 'src/app/components/match-analysis/match-analysis-list/match-analysis-list.component';
import { MatchAnalysisDetailsComponent } from 'src/app/components/match-analysis/match-analysis-details/match-analysis-details.component';
import { MatchAnalysisCreateComponent } from 'src/app/components/match-analysis/match-analysis-create/match-analysis-create.component';
import { MatchAnalysisUpdateComponent } from 'src/app/components/match-analysis/match-analysis-update/match-analysis-update.component';
import { ArchiveMatchsComponent } from 'src/app/Components/match-analysis/archive-matchs/archive-matchs.component';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [
    MatchAnalysisListComponent,
    MatchAnalysisDetailsComponent,
    MatchAnalysisCreateComponent,
    MatchAnalysisUpdateComponent,
    ArchiveMatchsComponent

  ],
  imports: [
    CommonModule,
    FormsModule,
    MenuModuleRoutingModule,
    ReactiveFormsModule,
    SharedModule
    
  ]
})
export class MatchAnalysisModule { }
