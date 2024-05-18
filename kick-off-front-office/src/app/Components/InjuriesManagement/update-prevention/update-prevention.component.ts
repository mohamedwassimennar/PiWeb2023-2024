import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Prevention } from 'src/app/models/prevention.model';

@Component({
  selector: 'app-update-prevention',
  templateUrl: './update-prevention.component.html',
  styleUrls: ['./update-prevention.component.css']
})
export class UpdatePreventionComponent implements OnInit {
  updatedPreventionForm: FormGroup;
  preventionId!: string;
  prevention!: Prevention;
  errorMessage: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private http: HttpClient
  ) {
    this.updatedPreventionForm = this.formBuilder.group({
      playerName: ['', Validators.required],
      description: ['', Validators.required],
      recommendedPractices: ['', Validators.required],
      equipmentRecommendations: ['', Validators.required],
      nutritionalRecommendations: ['', Validators.required],
      lifestyleRecommendations: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.preventionId = this.route.snapshot.params['id'];
    if (this.preventionId) {
      this.loadPreventionDetails();
    } else {
      console.error('No prevention ID provided.');
    }
  }

  loadPreventionDetails() {
    this.http.get<Prevention>(`http://localhost:3000/prevention/${this.preventionId}`).subscribe(
      (response) => {
        this.prevention = response;
        this.updatedPreventionForm.patchValue({
          playerName: response.playerName,
          description: response.description,
          recommendedPractices: response.recommendedPractices,
          equipmentRecommendations: response.equipmentRecommendations,
          nutritionalRecommendations: response.nutritionalRecommendations,
          lifestyleRecommendations: response.lifestyleRecommendations
        });
      },
      (error) => {
        if (error.status === 404) {
          console.error('Prevention not found.');
        } else {
          console.error('Error fetching prevention details:', error);
        }
      }
    );
  }

  onSubmit() {
    if (this.updatedPreventionForm.valid) {
      this.http.put<any>(`http://localhost:3000/prevention/update/${this.preventionId}`, this.updatedPreventionForm.value).subscribe(
        (response) => {
          console.log('Prevention updated successfully:', response);
          this.router.navigate(['/Prevention']); // Rediriger vers la liste des préventions après la mise à jour
        },
        (error) => {
          console.error('Error updating prevention:', error);
          if (error.status === 404) {
            this.errorMessage = 'Prevention not found.';
          } else {
            this.errorMessage = 'Error updating prevention. Please try again later.';
          }
        }
      );
    } else {
      console.error('Form is invalid. Please fill in all required fields.');
    }
  }
}
