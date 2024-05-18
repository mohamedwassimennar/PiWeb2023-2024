
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoutingModule } from './user-routing.module';
import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule
import { LoginComponent } from 'src/app/Components/login/login.component';
import { ProfileComponent } from 'src/app/Components/profile/profile.component';
import { CookieService } from 'ngx-cookie-service';
import { ToastrModule } from 'ngx-toastr';
import { UpdateProfileComponent } from 'src/app/Components/update-profile/update-profile.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ForgotPasswordComponent } from 'src/app/Components/forgot-password/forgot-password.component';

@NgModule({
  declarations: [      LoginComponent,ProfileComponent,UpdateProfileComponent,ForgotPasswordComponent
  ],
  providers: [CookieService],
  imports: [
    CommonModule,
    UserRoutingModule,  
    HttpClientModule ,
    ReactiveFormsModule,
    FormsModule, 
    SharedModule,
    ToastrModule.forRoot() 
  ]
})
export class UserModule { }
