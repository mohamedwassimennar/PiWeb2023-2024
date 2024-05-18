import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RecoveryPlan } from 'src/app/models/recoveryPlan.model';

@Component({
  selector: 'app-add-recovery-plan',
  templateUrl: './add-recovery-plan.component.html',
  styleUrls: ['./add-recovery-plan.component.css']
})
export class AddRecoveryPlanComponent implements OnInit {
  newRecoveryPlan: RecoveryPlan = {
    _id: '',
    playerName: '',
    injuryStatus: 'En attente', // Change to an initial valid value for injury status
    recoveryStartDate: new Date(),
    recoveryEndDate: new Date(),
    recoveryActivities: '',
    archived: false // Ajouter la propriété archived avec une valeur par défaut
  };

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {}

  onSubmit() {
    this.http.post('http://localhost:3000/recovery/addrecoveryplan', this.newRecoveryPlan)
      .subscribe(
        (response) => {
          console.log('Recovery Plan added successfully!', response);
          // Redirect to the Recovery Plans component after successful addition
          this.router.navigate(['/Recovery']);
          // Reset the form after successful addition
          this.resetForm();
        },
        (error) => {
          console.error('Failed to add recovery plan:', error);
        }
      );
  }

  // Reset the form after successful addition
  resetForm() {
    this.newRecoveryPlan = {
      _id: '',
      playerName: '',
      injuryStatus: '', // Reset the injury status to an initial valid value
      recoveryStartDate: new Date(),
      recoveryEndDate: new Date(),
      recoveryActivities: '',
      archived: false // Réinitialiser la propriété archived à sa valeur par défaut
    };
  }
}
