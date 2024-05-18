import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth/auth.service';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css']
})
export class InscriptionComponent implements OnInit {
  registrationForm!: FormGroup;
  selectedImage!: File | null;
  notificationMessage: string = '';
  notification :string = '';
  notificationMessageUser: string = '';
  notificationMessagePlayer: string = '';
  backgroundImageSrc: string = '../../../assets/images/fooball.jpg'; // Update this with the path to your image

  isSubMenuOpen: boolean = false;


  toggleSubMenu(): void {
    this.isSubMenuOpen = !this.isSubMenuOpen;

  }
  isPerformanceSubMenuOpen: boolean = false;

  togglePerformanceSubMenu() {
    this.isPerformanceSubMenuOpen = !this.isPerformanceSubMenuOpen;
  }
  isUserSubMenuOpen: boolean = false;
  toggleUserSubMenu() {
    this.isUserSubMenuOpen = !this.isUserSubMenuOpen;
  }
  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.registrationForm = this.fb.group({
      role: ['', Validators.required],
      firstName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      lastName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      email: ['', [Validators.required, Validators.pattern(/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/)]],
      confirmationCode: [''],
      confirmedEmail: [''],
      //  images: [''],
      // Role-specific attributes
      systemAccessPermissions: [''],
      userManagementRights: [''],
      dataManagementResponsibilities: [''],
      systemConfigurationSettings: [''],
      experienceLevel: [''],
      assignedTeam: [''],
      trainingSchedule: [''],
      technicalExpertise: [''],
      systemMaintenanceDuties: [''],
      integrationResponsibilities: [''],
      technicalSupportContact: [''],
      position: [''],
      age: ['', [Validators.required, Validators.pattern('^[0-9]{1,2}$')]],
      contact: ['', [Validators.required, Validators.maxLength(8)]],
      teamAffiliation: [''],
      medicalQualifications: [''],
      specializedArea: [''],
      coachingExperience: [''],
      fitnessTrainingExperience: [''],
      specializations: [''],
      expertiseAreas: [''],
      foot: [''],
      height: [''],
      weight: [''],
    });
  }
  registerUser(): void {
    if (this.registrationForm.valid) {
      const formData = new FormData();
  
      // Append selected image to form data if it's not null
      if (this.selectedImage) {
        formData.append('profileImage', this.selectedImage);
      }
  
      // Append other form values
      Object.keys(this.registrationForm.value).forEach(key => {
        formData.append(key, this.registrationForm.value[key]);
      });
  
      // Check if any required fields are empty
      const requiredFields = ['role', 'firstName', 'lastName', 'email', 'age', 'contact'];
      const emptyFields = requiredFields.filter(field => !this.registrationForm.value[field]);
      if (emptyFields.length > 0) {
        // Display message indicating incomplete fields
        this.notification = 'Please complete all required fields.';
        return; // Exit the method without submitting the form
      }
  
      // Proceed with form submission
      this.authService.registerUser(formData).subscribe(
        (response) => {
          console.log('Registration successful:', response);
          const role = this.registrationForm.value.role;
          this.notificationMessage = 'The account has been updated successfully';
          setTimeout(() => {
            this.notificationMessage = '';
          }, 3000);
          this.registrationForm.reset();
  
          // Clear the selected image after successful registration
          this.selectedImage = null;
        },
        (error) => {
          if (error.status === 409) { // Assuming 409 status code indicates user already exists
            // User already exists, show alert
            this.notificationMessageUser = 'This user already exists!';
            setTimeout(() => {
              this.notificationMessage = '';
            }, 3000); this.registrationForm.reset();
            this.selectedImage = null;
          } else {
            console.error('Registration failed:', error);
          }
        }
      );
    } else {
      // Display message indicating incomplete fields
      this.notification = 'Please complete all the required fields.';
    }
  }
  
 
  registerPlayer(): void {
    const playerData = { /* Your player data object here */ };
  
    // Call the service method to register players
    this.authService.registerPlayer(playerData).subscribe(
      response => {
        console.log('Response from backend:', response);
        if (response.success) {
          console.log('Players registered successfully:', response);
          this.notificationMessagePlayer = 'Players are successfully added.';
        } else {
          if (response.error === 500) {
            console.log('Some emails already exist');
            this.notificationMessagePlayer = 'Some emails already exist. Skipping registration.';
          } else {
            console.error('Error registering players:', response.error);
            this.notificationMessagePlayer = 'Error registering players. Please try again later.';
          }
        }
      },
      error => {
        console.error('Error registering players:', error);
        this.notificationMessagePlayer = 'Error registering players. Please try again later.';
      }
    );
  }

  onFileSelected(event: any) {
    this.selectedImage = event.target.files[0];
  }

  logout(): void {
    this.authService.performLogout().subscribe(
      () => {
        console.log('Logout successful');
        window.location.href = 'http://localhost:4200/user/login';
      },
      error => {
        console.error('Logout error:', error);
      }
    );
  }

}