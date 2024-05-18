import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForgotPasswordComponent } from 'src/app/Components/forgot-password/forgot-password.component';
import { LoginComponent } from 'src/app/Components/login/login.component';
import { ProfileComponent } from 'src/app/Components/profile/profile.component';
import { UpdateProfileComponent } from 'src/app/Components/update-profile/update-profile.component';
import { AuthGuardService } from 'src/app/Services/authGuard/auth-guard.service';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuardService] },
  { path: 'update', component: UpdateProfileComponent, canActivate: [AuthGuardService] },
  { path: 'forgot-password', component: ForgotPasswordComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
