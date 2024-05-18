import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth/auth.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {

  email: string = '';
  errorMessage: string = '';

  constructor(
    private router: Router,
    private auth: AuthService
  ) { }

  resetPassword(): void {
    this.errorMessage = ''; // Reset error message
    if (!this.email) {
      this.errorMessage = 'Please provide your email address.';
      return;
    }
    this.auth.forgotPassword(this.email).subscribe(
      (response) => {
        console.log(response); // Handle success response
        // Redirect to login page or show a success message
        this.router.navigate(['/user/login']);
      },
      (error: HttpErrorResponse) => {
        console.error(error); // Handle error response
        if (error.status === 404) {
          this.errorMessage = 'Email not registered'; // Display error message for 404 status
        } else {
          this.errorMessage = 'Failed to reset password. Please try again later.'; // Display generic error message
        }
      }
    );
  }
}
