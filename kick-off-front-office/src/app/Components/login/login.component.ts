import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  errorMessage: string = '';

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  loginUser() {
    if (this.loginForm.valid) {
      this.authService.loginUser(this.loginForm.value).subscribe(
        isLoggedIn => {
          if (isLoggedIn) {
           // this.router.navigate(['/dashboard']); // Redirect to dashboard for admin
          } else {
            this.router.navigate(['/home']); // Redirect to home for regular users
          }
        },
        error => {
          console.error('Login failed:', error);
          if (error.status === 401) {
            this.errorMessage = 'Incorrect email or password. Please try again.';
          } else if (error.status === 403) {
            this.errorMessage = 'Your account is not activated. Please contact support.';
          } else {
            this.errorMessage = 'An error occurred while logging in. Please try again later.';
          }
        }
      );
    }
  }

}