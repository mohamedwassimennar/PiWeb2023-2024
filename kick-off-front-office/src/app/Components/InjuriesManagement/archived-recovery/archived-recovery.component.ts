import { Component, OnInit } from '@angular/core';
import { RecoveryPlan } from 'src/app/models/recoveryPlan.model';
import { RecoveryPlanService } from 'src/app/Services/recoveryPlan.service';

@Component({
  selector: 'app-archived-recovery',
  templateUrl: './archived-recovery.component.html',
  styleUrls: ['./archived-recovery.component.css']
})
export class ArchivedRecoveryComponent implements OnInit {
  archivedRecoveryPlans: RecoveryPlan[] = [];

  constructor(private recoveryPlanService: RecoveryPlanService) { }

  ngOnInit(): void {
    this.fetchArchivedRecoveryPlans();
  }

  fetchArchivedRecoveryPlans(): void {
    this.recoveryPlanService.getArchivedRecoveryPlans()
      .subscribe(
        archivedRecoveryPlans => {
          this.archivedRecoveryPlans = archivedRecoveryPlans;
        },
        error => {
          console.error('Error fetching archived recovery plans:', error);
        }
      );
  }
}
