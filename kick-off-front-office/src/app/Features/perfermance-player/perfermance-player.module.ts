import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { RouterModule } from '@angular/router';
import { MenuModuleRoutingModule } from './perfermance-player-module-routing.module';
import { PlayerPerformanceListComponent } from 'src/app/components/player-performance/player-performance-list/player-performance-list.component';
import { PlayerPerformanceDetailsComponent } from 'src/app/components/player-performance/player-performance-details/player-performance-details.component';
import { PlayerPerformanceCreateComponent } from 'src/app/components/player-performance/player-performance-create/player-performance-create.component';
import { PlayerPerformanceUpdateComponent } from 'src/app/components/player-performance/player-performance-update/player-performance-update.component';
import { ArchivedPlayerPerformanceComponent } from 'src/app/Components/player-performance/archived-player-performance/archived-player-performance.component';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [
    PlayerPerformanceListComponent, 
    PlayerPerformanceDetailsComponent,
    PlayerPerformanceCreateComponent,
    PlayerPerformanceUpdateComponent,
    ArchivedPlayerPerformanceComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    MenuModuleRoutingModule,
    ReactiveFormsModule,
    SharedModule

  ]
})
export class PerfermancePlayerModule { }
