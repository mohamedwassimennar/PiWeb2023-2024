import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Injury } from 'src/app/models/injury.model';

@Component({
  selector: 'app-update-injury',
  templateUrl: './update-injury.component.html',
  styleUrls: ['./update-injury.component.css']
})
export class UpdateInjuryComponent implements OnInit {
  updatedInjuryForm: FormGroup;
  injuryId!: string;
  injury!: Injury;
  errorMessage: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private http: HttpClient
  ) {
    this.updatedInjuryForm = this.formBuilder.group({
      playerName: ['', Validators.required],
      type: ['', Validators.required],
      description: ['', Validators.required],
      date: ['', Validators.required],
      estimatedRecoveryTime: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.injuryId = this.route.snapshot.params['id'];
    if (this.injuryId) {
      this.loadInjuryDetails();
    } else {
      console.error('No injury ID provided.');
    }
  }

  loadInjuryDetails() {
    this.http.get<Injury>(`http://localhost:3000/injuries/${this.injuryId}`).subscribe(
      (response) => {
        this.injury = response;
        this.updatedInjuryForm.patchValue({
          playerName: response.playerName,
          type: response.type,
          description: response.description,
          date: response.date,
          estimatedRecoveryTime: response.estimatedRecoveryTime
        });
      },
      (error) => {
        if (error.status === 404) {
          console.error('Injury not found.');
        } else {
          console.error('Error fetching injury details:', error);
        }
      }
    );
  }

  onSubmit() {
    if (this.updatedInjuryForm.valid) {
      this.http.put<any>(`http://localhost:3000/injuries/update/${this.injuryId}`, this.updatedInjuryForm.value).subscribe(
        (response) => {
          console.log('Injury updated successfully:', response);
          this.router.navigate(['/Injuries']); // Rediriger vers la liste des blessures après la mise à jour
        },
        (error) => {
          console.error('Error updating injury:', error);
          if (error.status === 404) {
            this.errorMessage = 'Injury not found.';
          } else {
            this.errorMessage = 'Error updating injury. Please try again later.';
          }
        }
      );
    } else {
      console.error('Form is invalid. Please fill in all required fields.');
    }
  }
}
