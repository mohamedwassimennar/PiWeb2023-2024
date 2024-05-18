import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PlayerPerformance } from 'src/app/models/PlayerPerformance';
import { PlayerPerformanceService } from 'src/app/Services/player-performance.service';

@Component({
  selector: 'app-player-performance-create',
  templateUrl: './player-performance-create.component.html',
  styleUrls: ['./player-performance-create.component.css']
})
export class PlayerPerformanceCreateComponent {
  performanceForm: FormGroup; 
  newPerformance: any = {};
  successMessage: string | null = null;
  errorMessage: string | null = null;


  constructor(
    private formBuilder: FormBuilder,
    private performanceService: PlayerPerformanceService,
    private router: Router
  ) {
    this.performanceForm = this.formBuilder.group({
      nom: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]{3,}$')]],
      age: ['', [Validators.required, Validators.min(18), Validators.pattern("^[0-9]*$")]],
      totalMatchesPlayed: ['', [Validators.required, Validators.min(0), Validators.pattern("^[0-9]*$")]],
      goals: ['', [Validators.required, Validators.min(0), Validators.pattern("^[0-9]*$")]],
      totalDistanceCovered: ['', [Validators.required, Validators.min(0), Validators.pattern("^[0-9]*$")]],
      yellowCards: ['', [Validators.required, Validators.min(0), Validators.pattern("^[0-9]*$")]],
      redCards: ['', [Validators.required, Validators.min(0), Validators.pattern("^[0-9]*$")]],
      assists: ['', [Validators.required, Validators.min(0), Validators.pattern("^[0-9]*$")]],
      distanceCovered: ['', [Validators.required, Validators.min(0), Validators.pattern("^[0-9]*$")]]
    });
  }

  addPerformance(): void {
    if (this.performanceForm.invalid) {
      return;
    }

    const newPerformance: PlayerPerformance = this.performanceForm.value;

    this.performanceService.createPerformance(newPerformance)
      .subscribe(
        response => {
          this.successMessage = 'Performance added successfully';
          this.errorMessage = null;
          this.performanceForm.reset();
          setTimeout(() => {
            this.successMessage = null;
          }, 5000); // Masquer le message de succès après 5 secondes
        },
        error => {
          this.errorMessage = 'Error adding performance: ' + error.message;
          this.successMessage = null;
        }
      );
  }

  retourFunction() {
    console.log("Bouton Retour cliqué !");
    this.router.navigate(['/PerfermancePlayer/perfermance-list']);

  }
}
