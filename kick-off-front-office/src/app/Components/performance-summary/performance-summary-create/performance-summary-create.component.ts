import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PerformanceSummary } from 'src/app/models/Performance Summary';
import { PerformanceSummaryService } from 'src/app/Services/performance-summary.service';

@Component({
  selector: 'app-performance-summary-create',
  templateUrl: './performance-summary-create.component.html',
  styleUrls: ['./performance-summary-create.component.css']
})
export class PerformanceSummaryCreateComponent {
  performance: PerformanceSummary = new PerformanceSummary();
  performanceForm!: FormGroup;
  successMessage: string | null = null;
  errorMessage: string | null = null;

  constructor(
    private performanceService: PerformanceSummaryService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {  this.performanceForm = this.formBuilder.group({
    season: ['', Validators.required],
    totalGoalsScored: ['', [Validators.required, Validators.pattern("^[0-9]*$"), Validators.min(0)]],
    averagePassCompletionRate: ['', [Validators.required, Validators.min(0), Validators.max(100)]],
    totalDistanceCovered: ['', [Validators.required, Validators.min(0)]],
    totalMatchesPlayed: ['', [Validators.required, Validators.min(0)]],
    yellowCards: ['', [Validators.required, Validators.min(0)]],
    redCards: ['', [Validators.required, Validators.min(0)]],
    minutesPlayed: ['', [Validators.required, Validators.min(0)]],
  });}

addPerformance(): void {
  if (this.performanceForm.valid) {
    // Mettre à jour this.performance avec les valeurs du formulaire
    this.performance = this.performanceForm.value;

    this.performanceService.create(this.performance).subscribe(
      () => {

        console.log("Performance  summary added successfully!");
        this.successMessage = 'Performance  summary added successfully';
        this.errorMessage = null;
        this.performanceForm.reset();
        setTimeout(() => {
          this.successMessage = null;
        }, 5000); // Masquer le message de succès après 5 secondes
    
      },
      (error) => {
        console.error('Error adding performance:', error);
        // Gérer les erreurs
      }
    );
  }
}

retourFunction() {
  console.log("Bouton Retour cliqué !");
  this.router.navigate(['/perfermance-summary/perfermance-summary-list']);

}

}
