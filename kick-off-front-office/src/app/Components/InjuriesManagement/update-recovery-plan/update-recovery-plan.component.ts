import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RecoveryPlan } from 'src/app/models/recoveryPlan.model';

@Component({
  selector: 'app-update-recovery-plan',
  templateUrl: './update-recovery-plan.component.html',
  styleUrls: ['./update-recovery-plan.component.css']
})
export class UpdateRecoveryPlanComponent implements OnInit {
  updatedRecoveryPlanForm: FormGroup;
  recoveryPlanId!: string;
  recoveryPlan!: RecoveryPlan;
  errorMessage: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private http: HttpClient
  ) {
    this.updatedRecoveryPlanForm = this.formBuilder.group({
      playerName: ['', Validators.required],
      injuryStatus: ['', Validators.required],
      recoveryStartDate: ['', Validators.required],
      recoveryEndDate: ['', Validators.required],
      recoveryActivities: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.recoveryPlanId = this.route.snapshot.params['id'];
    if (this.recoveryPlanId) {
      this.loadRecoveryPlanDetails();
    } else {
      console.error('No recovery plan ID provided.');
    }
  }

  loadRecoveryPlanDetails() {
    this.http.get<RecoveryPlan>(`http://localhost:3000/recovery/${this.recoveryPlanId}`).subscribe(
      (response) => {
        this.recoveryPlan = response;
        this.updatedRecoveryPlanForm.patchValue({
          playerName: response.playerName,
          injuryStatus: response.injuryStatus,
          recoveryStartDate: response.recoveryStartDate,
          recoveryEndDate: response.recoveryEndDate,
          recoveryActivities: response.recoveryActivities
        });
      },
      (error) => {
        if (error.status === 404) {
          console.error('Recovery plan not found.');
        } else {
          console.error('Error fetching recovery plan details:', error);
        }
      }
    );
  }

  onSubmit() {
    if (this.updatedRecoveryPlanForm.valid) {
      this.http.put<any>(`http://localhost:3000/recovery/update/${this.recoveryPlanId}`, this.updatedRecoveryPlanForm.value).subscribe(
        (response) => {
          console.log('Recovery plan updated successfully:', response);
          this.router.navigate(['/Recovery']); // Rediriger vers la liste des plans de récupération après la mise à jour
        },
        (error) => {
          console.error('Error updating recovery plan:', error);
          if (error.status === 404) {
            this.errorMessage = 'Recovery plan not found.';
          } else {
            this.errorMessage = 'Error updating recovery plan. Please try again later.';
          }
        }
      );
    } else {
      console.error('Form is invalid. Please fill in all required fields.');
    }
  }
}
